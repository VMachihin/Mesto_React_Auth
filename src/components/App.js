import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import * as auth from '../utils/Auth';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [onClose, setOnClose] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false); //Управление текстом в кнопке
  const [tooltip, setTooltip] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  // обработчик Escape
  const isOpen =
    isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setOnClose(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setOnClose(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setOnClose(true);
  }
  function closeAllPopups() {
    setOnClose(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  }
  function handleCardClick(card) {
    setSelectedCard({ name: card.name, link: card.link });
    setOnClose(true);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.error(err));
  }
  function handleCardDelete(cardId) {
    api
      .deleteCardApi(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id === cardId ? null : state)));
      })
      .then(() => closeAllPopups())
      .catch((err) => console.error(err));
  }
  function handleUpdateUser(updateUserData) {
    setIsLoading(true);
    api
      .editingProfile(updateUserData)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleAddPlaceSubmit(userNewCard) {
    setIsLoading(true);
    api
      .addNewCard(userNewCard)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .changeAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    loggedIn &&
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.error(err));
  }, [loggedIn]);

  // обработчик Escape
  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  React.useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        auth.checkToken(token).then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate('/', { replace: true });
          }
        });
      }
    }
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setTooltip(true);
        setOnClose(true);
        setError(false);
        navigate('/sign-in', { replace: true });
      })
      .catch((error) => {
        setError(true);
        console.error(error);
        setTooltip(true);
        setOnClose(true);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setUserEmail('');
  }

  console.log(error);
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail} onSignOut={handleSignOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                setTooltip={setTooltip}
                setOnClose={setOnClose}
                onRegister={handleRegister}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} setUserEmail={setUserEmail} />}
          />
        </Routes>

        {loggedIn && <Footer />}

        <ImagePopup card={selectedCard} onClose={onClose} closeAllPopups={closeAllPopups} />
        <InfoTooltip
          onClose={onClose}
          closeAllPopups={closeAllPopups}
          tooltip={tooltip}
          error={error}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={onClose}
          closeAllPopups={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={onClose}
          closeAllPopups={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={onClose}
          closeAllPopups={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
