import React from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);
  }

  return (
    <div className="identification">
      <form
        className="auth-form auth-form_type_login"
        onSubmit={handleSubmit}
      >
        <h2 className="auth-form__title">Вход</h2>
        <input
          type="email"
          className="auth-form__input"
          value={email || ""}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="auth-form__input"
          value={password || ""}
          onChange={handlePasswordChange}
          placeholder="Пароль"
          required
        />
        <button type="submit" className="auth-form__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
