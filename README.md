# Зовнішній сервіс з API-погодою + HTTP-сервер

## Вступ

Проєкт реалізує:

- Взаємодію з **зовнішнім API погоди** (`WeatherAPI.com`).
- Побудову простого веб-сервера з авторизацією та особистими даними.
- Використання шаблонізатора `Pug` для рендерингу сторінок.
- Відображення отриманої з API інформації.

---

## ✅ Вправа 6.1 — Сценарій використання зовнішнього API

Обраний API: [WeatherAPI.com](https://www.weatherapi.com/)

Сценарій:

1. Користувач вводить назву міста у форму на `/weather`.
2. Сервер надсилає GET-запит до API `/current.json?q=<city>` (мовою `uk`).
3. Відповідь обробляється. Інформація про температуру, вологість, опис і дату показується у браузері.
4. Якщо місто не знайдене — виводиться повідомлення про помилку.

---

## ✅ Вправа 6.2 — Виклик API і візуалізація

### 🔹 Роут: `GET /weather`

- Якщо **немає параметрів** — рендериться форма.
- Якщо `?city=...` передано — робиться запит до API і виводиться:
  - місто
  - опис погоди
  - температура (°C)
  - вологість (%)
  - дата

> **Примітка:** WeatherAPI.com не працює з кирилицею, тому для отримання погоди, необхідно ввести назву міста на англійській.

**Приклад:**  
`/weather?city=Kyiv`

---

## ✅ Вправа 6.3 — HTTP-сервер і особисті дані

### 🔹 Роут: `GET /`

- Головна сторінка. Привітання.

### 🔹 Роут: `GET /login`

- Форма логіну.

### 🔹 Роут: `POST /login`

- Приймає `login` і `password`.
- Якщо вони збігаються з `.env`, показує:
  - Прізвище
  - Ім’я
  - Курс
  - Групу

---

## 🔁 Огляд усіх маршрутів

| Роут       | Метод | Призначення                                  | Вправа  |
| ---------- | ----- | -------------------------------------------- | ------- |
| `/`        | GET   | Головна сторінка                             | 6.3     |
| `/weather` | GET   | Форма пошуку погоди + запит до API           | 6.1–6.2 |
| `/login`   | GET   | Форма логіну                                 | 6.3     |
| `/login`   | POST  | Обробка логіну, відображення особистих даних | 6.3     |

---

## ⚙️ Інструкція з запуску

### 1. Клонувати репозиторій

```bash
git clone https://github.com/bdendro/pis_5.git
cd pis_5
```

### 2. Встановити всі необхідні Node-пакети:

```bash
npm install
```

### 3. Копіювання `.env` файлу

Скопіювати приклад конфігурації в `.env` файл і замінити значення деяких змінних на свої:

```bash
cp .env.example .env
```

> **Примітка:** Цей проєкт використовує API WeatherAPI.com, тому для запуску потрібен власний ключ API. Зареєструвати його можна безкоштовно на [weatherapi.com](https://www.weatherapi.com/).

### 4. Запуск сервера

```bash
npm run start
```

### 5. Перейти за посиланням

Перейти за посиланням http://localhost:3000/, якщо порт залишився без змін.

---

## 📚 Технологічний стек

- Node.js
- Express
- Axios
- Pug
- Bootstrap (через CDN)

---

## Автор

Oleh Buriachok
