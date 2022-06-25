import React from "react";
import Popup from "./Popup";
import Form from "./Form";

function PopupWithForm({
  name,
  title,
  textBtn,
  children,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  loadingTextBtn,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <div className="popup__form-container">
        <h2 className="popup__title">{title}</h2>
        <Form name={name} onSubmit={onSubmit} isLoading={isLoading} textBtn={textBtn} loadingTextBtn={loadingTextBtn} >{children}</Form>
        {/* <form
          className="form"
          name={`${name}Form`}
          onSubmit={onSubmit}
        >
          <div className="form__content">{children}</div>
          <button type="submit" className="button button_type_submit">
            {isLoading ? loadingTextBtn : textBtn}
          </button>
        </form> */}
      </div>
    </Popup>
  );
}

export default PopupWithForm;
