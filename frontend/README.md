# Frontend: AITaskPlanner

Фронтенд-частина веб-застосунку **AITaskPlanner** — інструменту для розробників, який за допомогою штучного інтелекту розбиває складні задачі на структурований покроковий план робіт та чеклісти.

---

## 🛠 Технологічний стек

- **Фреймворк:** [React 19](https://react.dev/)
- **Інструмент збірки:** [Vite 6](https://vite.dev/)
- **Маршрутизація:** [React Router v7](https://reactrouter.com/)
- **Стилізація:** CSS Modules + сучасні CSS-змінні (дизайн-токени) та CSS Cascade Layers
- **Менеджер пакетів:** npm

---

## 📋 Системні вимоги

- **Node.js:** версія `^18.0.0` або `^20.0.0` / `^22.0.0` (перевірено на Node v26.13)
- **npm:** версія `>= 9.0.0` (перевірено на npm 11.20)

Перевірити версії на вашій системі:
```bash
node -v
npm -v
```

---

## 🚀 Встановлення та запуск

1. **Перейдіть до каталогу фронтенду:**
   ```bash
   cd frontend
   ```

2. **Встановіть залежності:**
   ```bash
   npm install
   ```

3. **Створіть локальний конфіг змінних оточення (опціонально):**
   ```bash
   cp .env.example .env
   ```

4. **Запустіть сервер розробки:**
   ```bash
   npm run dev
   ```
   Сервер запуститься за адресою: `http://localhost:5173/` з підтримкою Hot Module Replacement (HMR).

---

## 📦 Доступні npm-скрипти

| Команда | Опис |
| :--- | :--- |
| `npm run dev` | Запуск локального dev-сервера з гарячою заміною модулів (Vite) |
| `npm run build` | Оптимізована компіляція проєкту для продакшну в каталог `dist/` |
| `npm run preview` | Локальний запуск та перегляд зібраного production-бандлу з `dist/` |
| `npm run lint` | Перевірка коду за допомогою ESLint |

> **Примітка щодо вихідної папки збірки:**  
> Папка `dist/` додана до `.gitignore` (як у корені репозиторію, так і у `frontend/.gitignore`) і не комітиться у систему контролю версій.

---

## 📁 Структура проєкту

```text
frontend/
├── .env.example              # Приклад конфігурації змінних оточення
├── .gitignore                # Ігнорування node_modules, dist, .env тощо
├── eslint.config.js          # Базова конфігурація ESLint
├── index.html                # Вхідна HTML-сторінка застосунку
├── package.json              # Залежності та npm-скрипти
├── vite.config.js            # Конфігурація збірки Vite та проксі для API
├── public/                   # Статичні файли (іконки, favicon)
└── src/
    ├── api/                  # Обгортки для взаємодії з бекендом
    │   └── client.js         # Базовий fetch-клієнт з обробкою помилок та VITE_API_URL
    ├── assets/               # Медіа-файли (зображення, векторна графіка)
    ├── components/           # Перевикористовувані UI-компоненти
    │   └── Layout/           # Головний каркас сторінки (Header, Outlet, Footer)
    │       ├── Layout.jsx
    │       └── Layout.module.css
    ├── hooks/                # Користувацькі React-хуки
    │   └── useDocumentTitle.js # Хук для динамічного оновлення заголовка сторінки
    ├── pages/                # Сторінки (представлення маршрутів)
    │   ├── Home/             # Головна сторінка (огляд сервісу, статус API)
    │   │   ├── Home.jsx
    │   │   └── Home.module.css
    │   └── NotFound/         # Сторінка 404
    │       ├── NotFound.jsx
    │       └── NotFound.module.css
    ├── styles/               # Глобальні стилі та дизайн-токени
    │   ├── variables.css     # CSS-змінні (кольори, відступи, шрифти, тіні)
    │   └── global.css        # Reset, base-стилі та cascade layers
    ├── App.jsx               # Кореневий компонент із налаштуванням маршрутизації
    └── main.jsx              # Точка монтування React-додатку в DOM
```

---

## 🌐 Змінні оточення та зв'язок з бекендом

- Налаштування оточення зберігаються у файлі `.env` (створюється локально на базі `.env.example`).
- Змінна `VITE_API_URL`: вказує базову адресу REST API бекенду.
  ```env
  VITE_API_URL=http://localhost:3000
  ```
- **Vite Proxy:**  
  У файлі `vite.config.js` налаштовано секцію `server.proxy` для маршруту `/api` на `http://localhost:3000`. Це дозволяє уникнути проблем із CORS під час локальної розробки до моменту інтеграції з бекенд-сервером.

---

## 🎨 Гайдлайн зі стилізації (CSS Modules)

Для оформлення інтерфейсу команди обрано підхід **CSS Modules** разом із дворівневою системою **дизайн-токенів**.

### 1. Використання CSS Modules
- Файл стилів компонента створюється поруч із JSX-файлом та має розширення `[Name].module.css` (наприклад, `Layout.module.css`).
- Імпорт стилів у компонент:
  ```jsx
  import styles from './Button.module.css';

  export function Button({ children, variant = 'primary' }) {
    return (
      <button className={`${styles.button} ${styles[variant]}`}>
        {children}
      </button>
    );
  }
  ```
- Назви класів пишуться в нотації `camelCase` (наприклад, `headerInner`, `primaryButton`, `navLinkActive`), що спрощує доступ через крапку `styles.className`.

### 2. Дизайн-токени (CSS-змінні)
Всі константи стилів винесено в `src/styles/variables.css`:
- **Кольори:**  
  - Палітра: `var(--color-slate-*)`, `var(--color-indigo-*)`
  - Семантичні токени: `var(--color-bg-app)`, `var(--color-bg-surface)`, `var(--color-text-primary)`, `var(--color-brand)`, `var(--color-border-subtle)`
- **Відступи (Logical Spacing):** `var(--space-1)` (0.25rem) ... `var(--space-12)` (3rem). Завжди надавайте перевагу логічним властивостям CSS (`padding-inline`, `padding-block`, `margin-inline`, `margin-block`).
- **Типографіка:** `var(--font-family-sans)`, `var(--font-family-mono)`, шкала розмірів від `var(--font-size-xs)` до `var(--font-size-3xl)`.
- **Радіуси:** `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)`, `var(--radius-full)`.

### 3. Базові та скидальні стилі
У `src/styles/global.css` застосовано систему каскадних шарів `@layer reset, base, components, utilities;`, що запобігає конфліктам специфічності та забезпечує передбачуваність стилів.

---

## ⚙️ Лінтери та форматування

У поточному каркасі збережено стандартну конфігурацію ESLint (`eslint.config.js`), згенеровану Vite:
- Перевірка запуску: `npm run lint`

> **Зверніть увагу:** Повне налаштування командних правил лінтерів, сумісності правил із бекендом та конфігурація Stylelint є предметом окремих задач (#11 та #12) і виконується відповідальним членом команди.
