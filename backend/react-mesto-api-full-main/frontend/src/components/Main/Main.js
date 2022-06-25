import Card from '../Card/Card';
import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <div onClick={onEditAvatar} className="profile__image-button">
            <div className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__text">{currentUser.about}</p>
            <button onClick={onEditProfile} type="button" className="profile__edit-button button">
            </button>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button button">
        </button>
      </section>
      <section className="cards">
        <ul className="cards-list">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              name={card.name}
              link={card.link}
              likes={card.likes}
              key={card._id}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete} />
          ))}
        </ul>
      </section>
    </main>

  );
}

export default Main;