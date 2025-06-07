import React, { useState, useEffect } from "react";
import TodoForm from "./components/ToDoForm/ToDoForm.jsx";
import TodoList from "./components/ToDoList/ToDoList.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);

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

  const [filter, setFilter] = useState("all");

  return (
    <div className="todo-app">
      <h1 className="todo-app__title">Список задач</h1>
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
