# КОМПОЗИТ Т.А. — Кубурхои шишапластикӣ

Лендинг завода стеклопластиковых (ГРП) труб в Душанбе на **Next.js 16 + React 19 + Tailwind CSS v4 + shadcn (TypeScript)**.

Главный акцент — компонент **`SmoothScrollHero`**: фоновое фото трубы раскрывается через анимацию `clip-path` по мере скролла (параллакс на `framer-motion`).

## Стек

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript
- Tailwind CSS v4 (конфиг в `src/app/globals.css`)
- shadcn (структура `components.json`, alias `@/*`, `src/lib/utils.ts`)
- framer-motion (анимация скролл-hero)
- lucide-react (иконки)

## Запуск

```bash
npm install      # если зависимости не установлены
npm run dev      # http://localhost:3000
npm run build    # прод-сборка
```

## Где что лежит

```
src/
├── app/
│   ├── layout.tsx     # шрифты Sora + Manrope, метаданные, тёмная тема
│   ├── page.tsx       # главная: hero + статистика + преимущества + продукция + CTA
│   └── globals.css    # Tailwind v4 + CSS-переменные shadcn
├── components/ui/
│   └── smooth-scroll-hero.tsx   # интегрированный компонент (as-is)
└── lib/utils.ts       # cn() helper (shadcn)
public/
└── factory-pipe.jpg   # фото для hero (реальный снимок трубы завода)
```

## Компонент SmoothScrollHero

Расположен в `src/components/ui/smooth-scroll-hero.tsx` (папка `components/ui` —
стандарт shadcn: туда складываются переиспользуемые UI-примитивы, на которые
ссылается alias `@/components/ui/*`).

Пропсы:

| Проп | Тип | Назначение |
|------|-----|-----------|
| `scrollHeight` | number | высота скролл-секции в px (длина анимации) |
| `desktopImage` | string | фон для десктопа (≥ md) |
| `mobileImage` | string | фон для мобильных (< md) |
| `initialClipPercentage` | number | начальный clip-path (окно при скролле 0) |
| `finalClipPercentage` | number | финальный clip-path (полное раскрытие) |

Пример использования — в `src/app/page.tsx`:

```tsx
<SmoothScrollHero
  scrollHeight={1500}
  desktopImage="/factory-pipe.jpg"
  mobileImage="/factory-pipe.jpg"
  initialClipPercentage={25}
  finalClipPercentage={75}
/>
```

Текст hero вынесен в отдельный оверлей (`HeroOverlay`) поверх компонента, с
тёмной радиальной подложкой для читаемости над светлым центром фото.

## Что заменить на реальные данные

- Телефон / email / адрес — в `src/app/page.tsx` (Header, CTA, Footer)
- Фото hero — `public/factory-pipe.jpg` (можно положить аэрофотоснимок завода)
- Навигация ведёт на якоря-заглушки — подключить реальные страницы при росте сайта
