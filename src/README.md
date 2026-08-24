# Кастомизация файлов Vue

## Обзор

Проект использует встроенную систему кастомизации пакета `@private/ismyteam`. Она позволяет подменять любые файлы из `src/` пакета без изменения самой зависимости.

## Краткая инструкция

### 1. Структура каталогов

```
fact-frontend/
├── src/
│   └── src/                              ← двойной src обязателен
│       └── pages/main/ui/
│           └── MainPageDashboardHeader.vue   ← ваш файл (любой путь пакета)
└── node_modules/
    └── @private/ismyteam/
        └── src/
            └── pages/main/ui/
                └── MainPageDashboardHeader.vue   ← оригинал (не трогаем)
```

### 2. Как найти путь для копирования

Путь в кастомизации строится так:

```
src/src/ + [путь файла внутри пакета от src/]
```

| Оригинал (в пакете) | Копия (в проекте) |
|---|---|
| `node_modules/@private/ismyteam/src/pages/main/ui/MainPageDashboardHeader.vue` | `src/src/pages/main/ui/MainPageDashboardHeader.vue` |
| `node_modules/@private/ismyteam/src/shared/ui/BaseButton.vue` | `src/src/shared/ui/BaseButton.vue` |
| `node_modules/@private/ismyteam/src/assets/sass/variables.module.scss` | `src/src/assets/sass/variables.module.scss` |

### 3. Команда для копирования

```bash
mkdir -p src/src/<относительный_путь_от_src/>
cp node_modules/@private/ismyteam/src/<относительный_путь_от_src/> src/src/<относительный_путь_от_src/>
```

Пример:
```bash
mkdir -p src/src/pages/main/ui
cp node_modules/@private/ismyteam/src/pages/main/ui/MainPageDashboardHeader.vue src/src/pages/main/ui/
```

### 4. Перезапуск

```bash
npx my-team
```

## Как это работает

Пакет запускается через `vite-server.ts`, который:

1. Выставляет `CUSTOMIZATION=true` (так как проект запущен вне папки пакета)
2. Выставляет `CUSTOMIZATION_DIR=./src`
3. Плагин `viteCustomization()` перехватывает все импорты, содержащие `/src/`
4. Проверяет наличие файла по пути `CUSTOMIZATION_DIR/src/<путь_файла>`
5. Если файл найден — отдаёт его вместо оригинального

## Важные замечания

- **Не меняйте** `node_modules/@private/ismyteam/src/` — ваши правки потеряются при переустановке зависимостей
- В `src/` создаётся **двойная** структура `src/src/` — это особенность плагина
- После перезапуска в консоли появится `has override file "..."`
- Кастомизация подменяет файл целиком — если оригинал импортирует другие модули пакета, они продолжат работать из оригинального пакета
