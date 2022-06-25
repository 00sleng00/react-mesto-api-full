import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [isOpen, currentUser.name, currentUser.about]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      textBtn="Сохранить"
      loadingTextBtn="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="form__field">
        <input
          className="form__input form__input_name_username"
          type="text"
          placeholder="Имя"
          name="username"
          id="username-input"
          required
          minLength={2}
          maxLength={40}
          value={name || ""}
          onChange={handleNameChange}
        />
        <span
          className="form__input-error username-input-error"
          id="username-input-error"
        />
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_name_profession"
          type="text"
          placeholder="О себе"
          name="profession"
          id="profession-input"
          required
          minLength={2}
          maxLength={200}
          value={description || ""}
          onChange={handleDescriptionChange}
        />
        <span
          className="form__input-error profession-input-error"
          id="profession-input-error"
        />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
