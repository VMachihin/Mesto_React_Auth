import React from 'react';
import { Link } from 'react-router-dom';

import UseForm from '../hooks/UseForm';

function Register({ onRegister }) {
  const { values, handleChange } = UseForm({});

  function handleSubmit(e) {
    e.preventDefault();

    if (values.password) {
      const { email, password } = values;
      onRegister(email, password);
    }
  }

  return (
    <section className="sign">
      <form className="sign__form" onSubmit={handleSubmit}>
        <h2 className="sign__title">Регистрация</h2>
        <input
          type="email"
          name="email"
          id="email"
          className="sign__input"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className="popup__text-error email-error"></span>
        <input
          type="password"
          name="password"
          id="password"
          className="sign__input"
          placeholder="Пароль"
          required
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className="popup__text-error password-error"></span>

        <button type="submit" className="sign__btn">
          Зарегистрироваться
        </button>

        <span className="sign__text">
          Уже зарегистрированы?&nbsp;
          <Link to="/sign-in" className="sign__linkSignIn">
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
}

export default Register;
