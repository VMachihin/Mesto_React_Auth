import React from 'react';
import PopupWithForm from './PopupWithForm';

import UseForm from '../hooks/UseForm';

function AddPlacePopup({ isOpen, onClose, closeAllPopups, onAddPlace, isLoading }) {
  const { values, handleChange, setValues } = UseForm({});

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(values);
  }

  React.useEffect(() => {
    setValues({
      place: '',
      linkImg: '',
    });
  }, [isOpen, setValues]);

  return (
    <PopupWithForm
      title={'Новое место'}
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
      name={'addCards'}
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="place"
        id="place"
        className="popup__input popup__input_addCard"
        placeholder="Название"
        value={values.place || ''}
        onChange={handleChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__text-error place-error"></span>
      <input
        type="url"
        name="linkImg"
        id="linkImg"
        className="popup__input popup__input_addCard"
        placeholder="Ссылка на картинку"
        value={values.linkImg || ''}
        onChange={handleChange}
        required
      />
      <span className="popup__text-error linkImg-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
