import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import auth from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ link: "", name: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardSelectedForDelete, setCardSelectedForDelete] = useState({});
  const [isSuccessReg, setIsSuccessReg] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailAuthorized, setEmailAuthorized] = useState("");
  const history = useHistory();

  useEffect(() => {
    handleTokenCheck();
    if (loggedIn) {
      history.push('/');
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([profileData, cardsData]) => {
        const data = {
          name: profileData.name,
          about: profileData.about,
          avatar: profileData.avatar,
          _id: profileData._id,
        };
        setCurrentUser(data);
        setCards(cardsData.reverse());
      })
      .catch((err) => console.log(err));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleConfirmDeleteClick(card) {
    setCardSelectedForDelete(card);
    setIsConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(!isImagePopupOpen);
  }

  function handleInfoTooltipSetOpen() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .updateProfile(data)
      .then((profileData) => {
        setCurrentUser(profileData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .updateAvatar(data)
      .then((avatarData) => {
        setCurrentUser(avatarData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
    setCardSelectedForDelete({});
  }

  // const escCloseFunction = useCallback((event) => {
  //   if (event.key === "Escape") {
  //     closeAllPopups();
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", escCloseFunction, false);
  //   return () => {
  //     document.removeEventListener("keydown", escCloseFunction, false);
  //   };
  // }, [escCloseFunction]);

  // const overlayCloseFunction = useCallback((event) => {
  //   if (event.target.classList.contains("popup_opened")) {
  //     closeAllPopups();
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("mousedown", overlayCloseFunction, false);
  //   return () => {
  //     document.removeEventListener("mousedown", overlayCloseFunction, false);
  //   };
  // }, [overlayCloseFunction]);

  // useEffect(() => {
  //   handleTokenCheck();
  // }, []);
  
  // useEffect(() => {
  //   if (loggedIn) {
  //     history.push("/");
  //     return;
  //   }
  //   history.push("/signin");
  // }, [history, loggedIn]);

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccessReg(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessReg(false);
      })
      .finally(() => {
        handleInfoTooltipSetOpen();
      });
  }

  function handleAuthorize(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setEmailAuthorized(data.email);
          history.push('/');
          // handleTokenCheck();
          setLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      setLoggedIn(true);
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
          setEmailAuthorized(res.email);
          }

          history.push('/');
        })
        .catch((err) => console.log(err));
    }
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <Header
          loggedIn={loggedIn}
          emailAuthorized={emailAuthorized}
          onLogOut={handleLogOut}
        />

        <Switch>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleAuthorize} />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onConfirmDelete={handleConfirmDeleteClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Route path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/singin" />}
          </Route>
        </Switch>

        <Footer loggedIn={loggedIn} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          card={cardSelectedForDelete}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccessReg={isSuccessReg}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
