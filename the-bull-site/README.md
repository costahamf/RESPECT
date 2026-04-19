# THE БЫК — проектная структура сайта

Проект подготовлен в поддерживаемой структуре без готовых файлов изображений.

## Структура

```text
the-bull-site/
├── index.html
├── css/
│   ├── main.css
│   ├── components.css
│   ├── responsive.css
│   └── animations.css
├── js/
│   ├── app.js
│   ├── cities.js
│   ├── render.js
│   ├── map.js
│   ├── modal.js
│   ├── burger.js
│   ├── lazy-load.js
│   └── scroll-spy.js
├── images/
│   ├── .gitkeep
│   ├── restaurants/
│   │   └── .gitkeep
│   └── icons/
│       └── .gitkeep
└── .gitignore
```

## Какие изображения добавить вручную

> Сейчас папка `images/` пустая (кроме `.gitkeep`). Добавьте файлы сами.

### Обязательные файлы

| Имя файла | Где используется | Рекомендуемый формат | Мин. размер |
|---|---|---|---|
| `images/logo.(svg|png|webp)` | Логотип в хедере | SVG/WEBP | 150x50 |
| `images/hero-bg.(jpg|webp)` | Фон hero-секции | WEBP/JPG | 1920x1080 |
| `images/founder.(jpg|webp)` | Фото основателя | WEBP/JPG | 800x800 |

### Файлы карточек ресторанов

Добавьте фото для каждого ресторана в `images/restaurants/` в любом удобном формате (`jpg/webp/png`) и при необходимости скорректируйте источник в `js/render.js`.

### Иконки

Если нужны ваши иконки, добавьте их в `images/icons/` и подключите в `js/render.js`.

## Yandex Maps API

1. Перейдите на https://developer.tech.yandex.ru/services/
2. Создайте ключ для JavaScript API и HTTP Геокодера.
3. Перед подключением `js/app.js` в `index.html` задайте:

```html
<script>
  window.YANDEX_MAPS_API_KEY = "ВАШ_КЛЮЧ";
</script>
```

4. Карта и метки инициализируются в `js/map.js`.
5. Бесплатный лимит: до 25 000 запросов/сутки (по условиям Яндекса).

## Запуск

Откройте `index.html` в браузере или загрузите папку `the-bull-site` на статический хостинг.
