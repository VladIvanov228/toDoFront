import React, { useState, useEffect } from "react";
import TodoForm from "./components/ToDoForm/ToDoForm.jsx";
import TodoList from "./components/ToDoList/ToDoList.jsx";
import Login from "./components/Login/Login.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null); //пользователь не авторизован

  // Загрузка из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch {
        setTasks([]);
      }
    }
  }, []);

  // Загрузка пользователя из localStorage при старте
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

   // Сохранение пользователя в localStorage, очистка при выходе
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("tasks");
      setTasks([]);
    }
  }, [user]);
  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: text.trim(), completed: false },
    ]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText.trim() } : task
      )
    );
  };

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="todo-app">
      <header className="todo-app__header">
        <h1 className="todo-app__title">Список задач для {user}</h1>
        <button className="todo-app__logout-btn" onClick={handleLogout}>
          Выйти
        </button>
      </header>
      <TodoForm onAdd={addTask} />
      <TodoList
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onEdit={editTask}
      />
    </div>
  );
}
