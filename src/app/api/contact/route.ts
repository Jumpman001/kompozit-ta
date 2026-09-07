import type { NextRequest } from "next/server";

/**
 * Приём заявки с формы и отправка письма через Resend (https://resend.com).
 *
 * Нужные переменные в .env.local (файл в git не попадает):
 *   RESEND_API_KEY      — ключ из личного кабинета Resend
 *   CONTACT_TO_EMAIL    — куда слать заявки (по умолчанию info@composite.tj)
 *   CONTACT_FROM_EMAIL  — от кого. Пока домен composite.tj не подтверждён
 *                         в Resend, используйте onboarding@resend.dev
 */

const MAX = { name: 120, company: 160, country: 80, email: 160, phone: 40, message: 4000 };

type Payload = Record<string, unknown>;

function clean(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

// Заголовки писем нельзя склеивать из строк с переводом строки — вырезаем.
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Простое ограничение частоты: не более 5 заявок с одного IP за 10 минут.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(request: NextRequest) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // Ловушка для ботов: поле спрятано от людей, заполняют только роботы.
  if (clean(body.website, 100)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, MAX.name);
  const company = clean(body.company, MAX.company);
  const country = clean(body.country, MAX.country);
  const email = clean(body.email, MAX.email);
  const phone = clean(body.phone, MAX.phone);
  const message = clean(body.message, MAX.message);
  const locale = clean(body.locale, 5) || "ru";
  const page = clean(body.page, 300);

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return Response.json({ error: "validation" }, { status: 422 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "info@composite.tj";
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY не задан — письмо не отправлено");
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Имя", name],
    ["Компания", company || "—"],
    ["Страна", country || "—"],
    ["Email", email],
    ["Телефон", phone || "—"],
    ["Язык сайта", locale],
    ["Страница", page || "—"],
  ];

  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:640px">
      <h2 style="margin:0 0 16px">Заявка с сайта kompozit-ta</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#666;white-space:nowrap">${k}</td>` +
              `<td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px">Сообщение</h3>
      <p style="white-space:pre-wrap;line-height:1.6;margin:0">${esc(message)}</p>
    </div>`;

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nСообщение:\n${message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Сайт КОМПОЗИТ Т.А. <${from}>`,
        to: [to],
        reply_to: email,
        subject: headerSafe(`Заявка с сайта — ${name}${company ? `, ${company}` : ""}`),
        html,
        text,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend вернул ошибку:", res.status, await res.text());
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] Не удалось связаться с Resend:", err);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
