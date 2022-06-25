import React from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';

const Login = ({ isOpen, onClose, handleLogin }) => {

  const [inputs, setInputs] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password) {
      return;
    }
    handleLogin(inputs.email, inputs.password)
  }

  return (
    <AuthPopup
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Вход"
      buttonValue="Войти"
    >
      <label className="auth__field">
        <input
          type="email"
          value={inputs.email || ''}
          onChange={handleChange}
          placeholder="Email"
          id="email-input"
          name="email"
          className="login__input login__input_type_email"
          required />
      </label>
      <label className="auth__field">
        <input
          type="password"
          value={inputs.password || ''}
          onChange={handleChange}
          id="password-input"
          placeholder="Пароль"
          name="password"
          className="login__input login__input_type_password"
          minLength="2"
          maxLength="200"
          required />
      </label>
    </AuthPopup>

  )
}


export default Login;