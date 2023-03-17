import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import UseForm from '../hooks/UseForm';

function EditProfilePopup({ isOpen, onClose, closeAllPopups, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = UseForm(currentUser);

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(values);
  }
  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name={'editUser'}
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="name"
        className="popup__input popup__input_edit"
        placeholder="Имя"
        value={values.name || ''}
        required
        minLength="2"
        maxLength="40"
        onChange={handleChange}
      />
      <span className="popup__text-error name-error" />
      <input
        type="text"
        name="about"
        id="aboutMe"
        className="popup__input popup__input_edit"
        placeholder="Профессия"
        value={values.about || ''}
        required
        minLength="2"
        maxLength="200"
        onChange={handleChange}
      />
      <span className="popup__text-error aboutMe-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
