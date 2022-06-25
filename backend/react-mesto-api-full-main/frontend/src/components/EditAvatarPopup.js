import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef(null);

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textBtn="Да"
      loadingTextBtn="Сохранение..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="form__field">
        <input
          ref={avatarRef}
          defaultValue={currentUser.avatar}
          className="form__input form__input_name_avatar"
          type="url"
          placeholder="Ссылка на новый аватар"
          name="avatar"
          id="avatar-input"
          required
        />
        <span
          className="form__input-error avatar-input-error"
          id="avatar-input-error"
        />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
