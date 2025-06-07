import React, { useState } from "react";
import "./ToDoForm.scss";

export default function TodoForm({ onAdd }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(input);
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-form__input"
        placeholder="Добавить задачу..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="todo-form__button">
        +
      </button>
    </form>
  );
}
