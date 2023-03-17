function ImagePopup({ card, onClose, closeAllPopups }) {
  return (
    <div className={`popup popup_bigImg ${card.link && onClose ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_bigImg">
        <img src={card.link} alt={`картинка в попапе с ${card.name}`} className="popup__image" />
        <span className="popup__title popup__title_bigImg">{card.name}</span>
        <button type="button" className="popup__close" onClick={closeAllPopups}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
