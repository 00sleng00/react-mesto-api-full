import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({
  isOpen,
  onClose,
  card,
  onCardDelete,
  isLoading,
}) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      textBtn="Да"
      loadingTextBtn="Удаление..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

export default ConfirmDeletePopup;
