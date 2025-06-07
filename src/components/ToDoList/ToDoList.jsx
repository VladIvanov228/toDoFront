import React from "react";
import ToDoItem from "../ToDoItem/ToDoItem";
import "./ToDoList.scss";

const FILTERS = {
  all: () => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed,
};

export default function ToDoList({
  tasks = [],
  filter,
  setFilter,
  onToggle,
  onDelete,
  onEdit,
}) {
  return (
    <div className="todo-list">
      <div className="todo-list__filters">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            className={`todo-list__filter ${
              filter === f ? "todo-list__filter--active" : ""
            }`}
            onClick={() => setFilter(f)}
          >
            {f === "all"
              ? "Все"
              : f === "active"
              ? "Активные"
              : "Выполненные"}
          </button>
        ))}
      </div>
      <ul className="todo-list__items">
        {tasks.filter(FILTERS[filter]).map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            onToggle={() => onToggle(task.id)}
            onDelete={() => onDelete(task.id)}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}
