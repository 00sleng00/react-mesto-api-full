import React from 'react';
import success from '../../images/Success.svg';
import fail from '../../images/Fail.svg';

function InfoTooltip({ isOpen, onClose, isSucceed }) {

  return (
    <section className={`pop-up ${isOpen && "pop-up_opened"}`} >
      <figure className="infoTooltip__container">
        <button onClick={onClose} type="button" className="pop-up__close button"></button>
        <img src={isSucceed ? success : fail} alt={isSucceed ? "Успех" : "Что-то пошло не так"} className="infoTooltip__img" />
        <p className="infoTooltip__tip">{isSucceed ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </figure>
    </ section>
  )
}

export default InfoTooltip;
