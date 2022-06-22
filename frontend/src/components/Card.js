import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

   const currentUser = React.useContext(CurrentUserContext);

   const isOwn = card.owner === currentUser._id;

   const cardDeleteButtonClassName = (
      `card__delete ${isOwn ? '' : 'card__delete_hidden'}`
   );
   
   const isLiked = card.likes.some((i) => i === currentUser._id);

   const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`;

   const handleClick = () => {
      onCardClick(card);
   }

   const handleLikeClick = () => {
      onCardLike(card);
   }

   const handleDeleteClick = () => {
      onCardDelete(card);
   }


      return (
         <li className="card__list-item">
            <img className="card__image" alt={card.name} src={card.link} onClick={handleClick} />
            <div className="card__block">
               <h2 className="card__text">{card.name}</h2>
               <button type="button" onClick={handleDeleteClick} className={cardDeleteButtonClassName}></button>
               <div className="card__element-container">
                  <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
                  <span className="card__like-count">{card.likes.length}</span>
               </div>
            </div>
         </li>
      );
   }

   export default Card;