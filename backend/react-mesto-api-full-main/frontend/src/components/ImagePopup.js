import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <Popup isOpen={isOpen} name="image" onClose={onClose}>
      <div className="popup__image-container">
        <img className="popup__image-link" src={`${card.link}`} alt="Фото" />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </Popup>
  );
}

export default ImagePopup;
