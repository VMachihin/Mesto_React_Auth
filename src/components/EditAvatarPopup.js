import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, closeAllPopups, onUpdateAvatar, isLoading }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      name={'changeAvatar'}
      isOpen={isOpen}
      closeAllPopups={closeAllPopups}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="linkAvatar"
        id="linkAvatar"
        className="popup__input popup__input_linkAvatar"
        placeholder="Ссылка на картинку"
        required
        ref={inputRef}
      />
      <span className="popup__text-error linkAvatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
