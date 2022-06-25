import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const changeAvatar = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: changeAvatar.current.value,
    });
  }

  React.useEffect(() => {
    changeAvatar.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmitForm={handleSubmit}
      title="Обновить аватар">
      <label className="pop-up__field">
        <input type="url" ref={changeAvatar} placeholder="Ссылка на аватар" name="avatar"
          className="pop-up__input pop-up__input_type_profile-photo-link" required />
        <span id="avatar-input-error" className="pop-up__input-error"></span>
      </label>
    </PopupWithForm>)

}

export default EditAvatarPopup;