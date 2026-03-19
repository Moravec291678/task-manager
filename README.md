# 📋 Task Manager

Trello-inspired task manager built with React. Manage your boards, columns and tasks with drag & drop support.

**🔗 Live demo:** https://task-manager-livid-two-30.vercel.app/

---

## ✨ Features

- 📌 Create, edit and delete boards with custom emoji icons
- 🗂️ Add, rename and delete columns
- ✅ Add, rename and delete tasks
- 🖱️ Drag & drop tasks between columns and reorder within a column
- 🏷️ Priority labels (High, Medium, Low)
- 📅 Deadline with status badge (Planned, In Progress, Due Today, Overdue, Done)
- 📝 Task description with inline editing
- 💬 Comments on tasks (add, edit, delete)
- ☑️ Mark tasks as done
- 💾 Data persisted in localStorage
- 🔔 Toast notifications for all actions
- ⌨️ Keyboard shortcuts (Enter to confirm, Escape to cancel)

---

## 🛠️ Tech Stack

- **React** – useState, useEffect, useReducer, useContext
- **React Router** – navigation between pages
- **@hello-pangea/dnd** – drag & drop
- **react-hot-toast** – notifications
- **Vite** – build tool
- **CSS3** – custom dark theme

---

## 🚀 Getting Started

```bash
git clone https://github.com/Moravec291678/task-manager.git
cd task-manager
npm install
npm run dev
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── BoardCard.jsx
│   ├── BoardModal.jsx
│   └── TaskModal.jsx
├── context/
│   └── TaskContext.jsx
├── pages/
│   ├── BoardsPage.jsx
│   └── BoardPage.jsx
├── utils/
│   └── emojis.js
├── App.jsx
└── index.css
```

---

## 👤 Author

**David Moravec** – Junior Frontend Developer

[![GitHub](https://img.shields.io/badge/GitHub-Moravec291678-181717?style=flat&logo=github)](https://github.com/Moravec291678)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-David%20Moravec-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/david-moravec-94ab01305/)