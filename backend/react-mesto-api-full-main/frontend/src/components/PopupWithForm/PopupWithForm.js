import React from 'react';
function PopupWithForm({ buttonText, name, title, isOpen, onClose, onSubmitForm, children }) {

  const defaultButtonTextValue = 'Сохранить';
  const buttonTextValue = buttonText ? buttonText : defaultButtonTextValue;

  return (
    <section className={`pop-up ${isOpen && "pop-up_opened"}`} >
      <div className="pop-up__container">
        <button onClick={onClose} type="button" className="pop-up__close button"></button>
        <h2 className="pop-up__title">{title}</h2>
        <form onSubmit={onSubmitForm} name={name} className="pop-up__form">
          <fieldset className="pop-up__fieldset">
            {children}
            <button type="submit" className="pop-up__button button">{buttonTextValue}</button>
          </fieldset>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;