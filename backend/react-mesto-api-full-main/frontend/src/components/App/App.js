import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ImagePopup from '../ImagePopup/ImagePopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import Login from "../Login/Login";
import Register from "../Register/Register";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../auth';

import api from '../../utils/Api';

function App() {
  const [isInfoTooltipSucceed, setIsInfoTooltipSucceed] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getProfile()])
        .then(([cards, userData]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // Setting up token operation
  const handleRegister = (email, password) => {
    return auth
      .register(email, password)
      .then(() => {
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSucceed(true);
        navigate("/sign-in")
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSucceed(false);
      })
  };

  const switchToLoggedIn = (email) => {
    setLoggedIn(true);
    setUserEmail(email);
    navigate("/");
    return loggedIn
  };

  const handleLogin = (email, password) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        if (!data.token) {
          return
        } else {localStorage.setItem('jwt', data.token);
        switchToLoggedIn(email);
          }
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsInfoTooltipSucceed(false);
      })
  };

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      let jwt = localStorage.getItem('jwt');
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            switchToLoggedIn(res.email);
          }
        })
    }
  }

  const signOut = () => {
    localStorage.removeItem('jwt')
    setUserEmail("");
    setLoggedIn(false);
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then(newCard => setCards(state => state.map(c => c._id === card._id ? newCard : c)))
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    const isOwn = card.owner === currentUser._id;
    if (isOwn) {
      api.deleteCard(card._id)
        .then(() => setCards(state => state.filter(c => c._id !== card._id)))
        .catch(err => console.log(err))
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handlePopupClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    return api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handlerEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function closeByOverlay(evt) {
    if (evt.target.classList.contains("Popup")) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handlerEscClose);
    document.addEventListener("click", closeByOverlay);
    return () => {
      document.removeEventListener("keydown", handlerEscClose);
      document.removeEventListener("click", closeByOverlay);
    };
  });

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <div className="container">
            <Routes>
              <Route
                exact
                path='/'
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <>
                      <Header loggedIn={loggedIn} email={userEmail} onSignOut={signOut} />
                      <Main
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handlePopupClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                      />
                      <Footer />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                exact
                path="/sign-in"
                element={
                  <>
                    <Header>
                      <Link className="header__link" to="/sign-up">
                        Регистрация
                      </Link>
                    </Header>
                    <Login
                      handleLogin={handleLogin}
                      tokenCheck={tokenCheck}
                    />
                  </>}
              />

              <Route
                exact
                path="/sign-up"
                element={
                  <>
                    <Header>
                      <Link className="header__link" to="/sign-in">
                        Вход
                      </Link>
                    </Header>
                    <Register
                      handleRegister={handleRegister}
                    />
                  </>}
              />
            </Routes>

            <InfoTooltip
              onClose={closeAllPopups}
              isOpen={isInfoTooltipOpen}
              isSucceed={isInfoTooltipSucceed}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar} />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
              isOpen={isImagePopupOpen}
            />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
