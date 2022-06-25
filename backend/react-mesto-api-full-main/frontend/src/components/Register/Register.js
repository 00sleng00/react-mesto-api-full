import React from 'react';
import AuthPopup from '../AuthPopup/AuthPopup';

const Register = ({ isOpen, onClose, handleRegister }) => {
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
    e.preventDefault()
    let { email, password } = inputs;
    handleRegister(email, password)
      .catch((err) => {
        setInputs(prev => ({
          ...prev,
          message: err
        }))
      });
  }

  return (
    <AuthPopup
      formName='register'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Регистрация"
      buttonValue="Зарегистрироваться"
    >
      <label className="auth__field">
        <input
          type="email"
          value={inputs.email || ''}
          onChange={handleChange}
          placeholder="Email"
          id="email-input"
          name="email"
          className="register__input register__input_type_email"
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
          className="register__input register__input_type_password"
          minLength="2"
          maxLength="200"
          required />
      </label>
    </AuthPopup>
  )
}

export default Register;