import React from "react";
import Popup from "./Popup";
import PopupWithForm from "./PopupWithForm";
import success from "../images/Success.svg";
import fail from "../images/Fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccessReg }) {
  return (
    <Popup isOpen={isOpen} name="info" onClose={onClose}>
      <div className="popup__form-container">
        <img
          className="popup__registration-image"
          src={isSuccessReg ? success : fail}
          alt={isSuccessReg ? "Иконка Успешно" : "Иконка Ошибка регистрации"}
        />
        <p className="popup__registration-message">
          {isSuccessReg
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так!" + "Попробуйте ещё раз."}
        </p>
      </div>
    </Popup>
  );
}
export default InfoTooltip;
