import React, { useState } from "react";
import "./ToDoItem.scss";

export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEditFinish = () => {
    if (editText.trim()) {
      onEdit(task.id, editText);
    }
    setEditing(false);
  };

  return (
    <li
      className={`todo-item ${task.completed ? "todo-item--completed" : ""}`}
    >
      <input
        type="checkbox"
        className="todo-item__checkbox"
        checked={task.completed}
        onChange={onToggle}
      />
      {editing ? (
        <input
          type="text"
          className="todo-item__edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEditFinish}
          onKeyDown={(e) => e.key === "Enter" && handleEditFinish()}
          autoFocus
        />
      ) : (
        <span
          className="todo-item__text"
          onDoubleClick={() => setEditing(true)}
          title="Двойной клик для редактирования"
        >
          {task.text}
        </span>
      )}
      <button className="todo-item__delete-btn" onClick={onDelete} aria-label="Удалить задачу">
        ×
      </button>
    </li>
  );
}
