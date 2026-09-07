import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// В Next.js 16 файл middleware.ts переименован в proxy.ts (та же логика,
// новое имя). next-intl отдаёт обычную функцию-обработчик запроса —
// экспортируем её как `proxy`, как того требует новая конвенция.
export const proxy = createMiddleware(routing);

export const config = {
  // Не трогаем статику, API и файлы с расширением.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
