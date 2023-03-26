import React from 'react';
import UseForm from '../hooks/UseForm';

function Login({ onAuthoriz }) {
  const { values, handleChange, setValues } = UseForm({});

  function handleSubmit(e) {
    e.preventDefault();

    if (!values.email || !values.password) {
      return;
    }
    setValues({ email: '', password: '' });
    onAuthoriz(values.email, values.password);
  }

  return (
    <section className="sign">
      <form className="sign__form" onSubmit={handleSubmit}>
        <h2 className="sign__title">Вход</h2>
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
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
