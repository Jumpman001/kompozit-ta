import { useLocale, useTranslations } from "next-intl";

/* У каждого языка своя версия логотипа — отличается подписью под названием
   (FIBERGLASS PIPES / СТЕКЛОПЛАСТИКОВЫЕ ТРУБЫ / ҚУБУРҲОИ ШИШАПЛАСТИКӢ).
   Вариант "light" — с белым текстом, для тёмной шапки поверх фото.
   Файлы в public/, размер исходника 800×257. */
const LOGO: Record<string, string> = {
  ru: "/logo-ru.png",
  tj: "/logo-tj.png",
  en: "/logo-en.png",
};

const LOGO_LIGHT: Record<string, string> = {
  ru: "/logo-ru-light.png",
  tj: "/logo-tj-light.png",
  en: "/logo-en-light.png",
};

export function Logo({
  className,
  light = false,
  hidden = false,
}: {
  className: string;
  /** Белый текст — для тёмного фона */
  light?: boolean;
  /** Спрятать от скринридера: используется во втором слое при перекрёстном затухании */
  hidden?: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations("Nav");
  const set = light ? LOGO_LIGHT : LOGO;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={set[locale] ?? set.ru}
      alt={hidden ? "" : t("logoAlt2")}
      aria-hidden={hidden || undefined}
      width={800}
      height={257}
      className={className}
    />
  );
}
