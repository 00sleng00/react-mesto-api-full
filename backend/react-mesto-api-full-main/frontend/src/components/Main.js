import React from "react";
import editImage from "../images/edit-image.svg";
import addImage from "../images/add-image.svg";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  onConfirmDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            {currentUser.avatar && (
              <img
                className="profile__avatar-img"
                src={currentUser.avatar}
                alt="Аватар"
              />
            )}
            <button
              type="button"
              className="profile__avatar-edit"
              onClick={onEditAvatar}
            />
          </div>
          <h1 className="profile__username">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button
            className="button button_type_edit"
            type="button"
            onClick={onEditProfile}
          >
            <img
              className="button__edit-image"
              src={editImage}
              alt="Карандаш"
            />
          </button>
          <button
            className="button button_type_add"
            type="button"
            onClick={onAddPlace}
          >
            <img className="button__add-image" src={addImage} alt="Плюс" />
          </button>
        </div>
      </section>
      <section className="cards">
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onConfirmDelete={onConfirmDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
