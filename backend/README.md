# Backend: AITaskPlanner

Бекенд-частина веб-застосунку **AITaskPlanner** — API-сервер на **Python + FastAPI**, який забезпечує бізнес-логіку планування задач, інтеграцію з AI для декомпозиції задач на підзадачі, критерії готовності та оцінку часу, а також роботу з Kanban-дошкою.

---

## 🛠 Технологічний стек

- **Мова:** Python (`>= 3.10`, перевірено на `3.14.5`)
- **Фреймворк:** [FastAPI](https://fastapi.tiangolo.com/)
- **ASGI-сервер:** [Uvicorn](https://www.uvicorn.org/)
- **Конфігурація середовища:** `python-dotenv`

---

## 📋 Системні вимоги

- **Python:** `>= 3.10`
- **pip:** актуальна версія (йде разом з Python)

Перевірити версію на Windows / Linux / macOS:
```bash
py --version      # Windows
python3 --version # Linux / macOS
```

---

## 🚀 Встановлення та запуск

1. **Перейдіть до каталогу бекенду:**
   ```bash
   cd backend
   ```

2. **Створіть та активуйте віртуальне середовище:**
   - Windows (PowerShell):
     ```powershell
     py -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
   - Linux / macOS:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. **Встановіть залежності:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Створіть локальний файл змінних оточення (опціонально):**
   ```bash
   cp .env.example .env
   ```

5. **Запустіть сервер розробки:**
   ```bash
   uvicorn app.main:app --reload --port 3000
   ```
   Сервер запускається на `http://localhost:3000`, що відповідає налаштуванню проксі `/api` у `frontend/vite.config.js`.
   Інтерактивна документація Swagger доступна на `http://localhost:3000/api/docs`.

---

## 📦 Корисні команди

| Команда | Опис |
| :--- | :--- |
| `uvicorn app.main:app --reload --port 3000` | Запуск dev-сервера з hot-reload |
| `python -m app.main` | Запуск через точку входу з налаштуваннями `.env` |
| `uvicorn app.main:app --host 0.0.0.0 --port 3000` | Запуск сервера без reload |
| `python -m compileall app` | Перевірка компіляції / синтаксису всіх модулів у `app/` |

---

## 📁 Структура проєкту

```text
backend/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── health.py    # Маршрут перевірки стану сервісу (/api/health)
│   │   ├── __init__.py
│   │   └── router.py        # Головний APIRouter (/api)
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py        # Зчитування та валідація змінних з .env
│   │   └── exceptions.py    # Єдиний JSON-формат помилок { "message": "..." }
│   ├── __init__.py
│   └── main.py              # Ініціалізація FastAPI, CORS, роутів і обробників
├── .env.example             # Приклад змінних оточення
├── .gitignore
├── pyproject.toml           # Метадані проєкту
└── requirements.txt         # Залежності проєкту
```

---

## 🔌 Базові маршрути API

- `GET /api/health` — перевірка працездатності сервера:
  ```json
  {
    "status": "ok",
    "service": "ai-task-planner-backend",
    "environment": "development",
    "timestamp": "2026-11-26T00:00:00+00:00"
  }
  ```

Усі помилки повертаються у JSON-форматі `{ "message": "..." }`, що сумісно з `frontend/src/api/client.js`.
