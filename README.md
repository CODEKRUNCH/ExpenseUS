# Expense US 💵

**Expense US** is a simple and powerful expense management web app that helps users track their income, expenses, and savings. Whether you’re budgeting for a trip, managing daily expenses, or just trying to save more, Expense US makes it easy and efficient.

## 🚀 Features

- 📊 Track income and expenses by categories
- 📅 View expenses by day, month, or year
- 📈 Visualize your spending with charts
- 🧾 Add, edit, and delete transactions easily
- 🔎 Filter and search transactions
- 👨‍💻 User authentication (Login/Signup)
- 🌙 Dark and light mode support
- 📱 Mobile-responsive design

## 🛠 Tech Stack

- **Frontend:** React.js, Axios, React Router
- **Backend:** Django
- **Database:** Postgres
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** TailwindCSS / CSS Modules

## 📂 Project Structure

```bash
expense-us/
├── client/           # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/  # API calls
│       ├── context/   # State management
│       └── App.js
├── server/           # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── README.md
└── package.json
```

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-us.git
cd expense-us
```

### 2. Set up the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `/server` folder and add:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the Frontend

```bash
cd client
npm install
npm start
```

The app will be running at `http://localhost:3000/`.

## 🎯 Roadmap

- [ ] Add budget planning feature
- [ ] Add multi-currency support
- [ ] Implement notifications/reminders
- [ ] Export expenses to CSV/PDF
- [ ] Add premium features

## 🧑‍💻 Contributing

Contributions are welcome!  
Equity Based on contributions
Please open an issue first to discuss what you would like to change.

Fork the repo, make changes, and create a pull request. 🚀



 Made with ❤️ 
