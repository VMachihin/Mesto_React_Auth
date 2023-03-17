function PopupWithForm({
  title,
  buttonText,
  name,
  children,
  isOpen,
  closeAllPopups,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen && onClose ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_${name}`}>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={`popup-${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__btn popup__btn_save" type="submit">
            {buttonText}
          </button>
        </form>
        <button type="button" className="popup__close" onClick={closeAllPopups} />
      </div>
    </div>
  );
}

export default PopupWithForm;
