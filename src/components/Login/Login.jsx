import React, { useState} from "react";
import "./Login.scss";

export default function Login({onLogin}){
    const [username, setUserName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            onLogin(username.trim());
        }
    };

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h2 className="login__title">Вход в профиль</h2>
                <input
                type="text"
                className="login__input"
                placeholder="Введите имя пользователя"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
                />
                <button type="submit" className="login__button" disabled={!username.trim()}>
                    Войти
                </button>
            </form>
        </div>
    );
}