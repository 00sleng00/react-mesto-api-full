import React from 'react';
import { Link } from "react-router-dom";

const AuthPopup = ({ title, children, buttonValue, onSubmit, formName }) => {
  return (
    <div className="auth__container">
      <h2 className="auth__title">{title}</h2>
      <form onSubmit={onSubmit} className="auth__form">
        <fieldset className='auth__fieldset'>
          {children}
        </fieldset>
        <button type="submit" className="auth__button button">{buttonValue}</button>
        {
          formName === 'register' &&
          <p className="auth__hint">
            Уже зарегистрированы?{" "}
            <Link className="auth__link link" to="/sign-in">
              Войти
            </Link>
          </p>
        }
      </form>
    </div>
  )
};

export default AuthPopup;