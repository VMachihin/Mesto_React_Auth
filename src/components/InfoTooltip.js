import ok from '../images/info/Ok.png';
import err from '../images/info/Error.png';

function InfoTooltip({ tooltip, error, onClose, closeAllPopups }) {
  return (
    <div className={`popup popup__infoTooltip ${tooltip && onClose ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__infoTooltip">
        <div className="popup__imgWrapper">
          <img src={error ? err : ok} alt={`картинка в попапе с`} className="popup__image" />
        </div>
        <span className="popup__title popup__title_infoTooltip">
          {error ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!'}
        </span>
        <button type="button" className="popup__close" onClick={closeAllPopups}></button>
      </div>
    </div>
  );
}
export default InfoTooltip;
