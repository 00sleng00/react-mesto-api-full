import React from 'react';

function ImagePopup({ card, isOpen, onClose }) {

  return (
    <section className={`pop-up ${isOpen && "pop-up_opened"}`} >
      <figure className="pop-up__photo-container">
        <button onClick={onClose} type="button" className="pop-up__close button"></button>
        <img className="pop-up__fullsize-photo" alt={card.name} src={card.link} onClick={onClose} />
        <figcaption className="pop-up__figcaption">{card.name}</figcaption>
      </figure>
    </section >
  );
}

export default ImagePopup;