import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isProd = process.env.NODE_ENV === "production";

// Внешние ресурсы, которым нужен доступ: встроенное YouTube-видео в разделе
// «Новости» (youtube-nocookie.com) и карта Яндекс в разделе «Контакты».
// Форма заявки шлёт запрос на собственный /api/contact, поэтому
// connect-src 'self' достаточно — менять CSP не нужно.
// 'wasm-unsafe-eval' нужен распаковщику Draco: 3D-модель трубы на странице
// продукции сжата им. Сам распаковщик лежит у нас в /public/draco, наружу
// ничего не ходит.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "frame-src https://www.youtube-nocookie.com https://yandex.ru https://yandex.tj",
  "connect-src 'self'",
  // Распаковщик Draco считает геометрию в отдельном потоке и создаёт его из
  // blob-ссылки. Разрешаем это только для воркеров, script-src не трогаем.
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  // Только для боевого сайта: на локальном http-сервере эта строка заставляет
  // браузер (особенно Safari) искать всё по https и страница перестаёт грузиться.
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // HSTS — обещание браузеру «этот адрес всегда только по https», на два года
  // и для всех поддоменов. В разработке это ломает http://localhost: Safari
  // запоминает обещание и потом отказывается открывать сайт по http.
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  images: {
    // 90 — hero (компенсирует зум-анимацию), 75 — остальные фото
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
