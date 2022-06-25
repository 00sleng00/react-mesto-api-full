import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return;
    }
    onRegister(email, password);
  }

  return (
    <div className="identification">
      <form
        className="auth-form auth-form_type_register"
        onSubmit={handleSubmit}
      >
        <h2 className="auth-form__title">Регистрация</h2>
        <input
          type="email"
          className="auth-form__input"
          value={email || ""}
          onChange={handleEmailChange}
          placeholder="Email"
          autoComplete="off"
          required
        />
        <input
          type="password"
          className="auth-form__input"
          value={password || ""}
          onChange={handlePasswordChange}
          placeholder="Пароль"
          autoComplete="off"
          required
        />
        <button type="submit" className="auth-form__button">
          Зарегистрироваться
        </button>
        <Link className="auth-form__link" to="/signin">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
