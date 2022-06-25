import React from "react";
import { useEffect } from "react";

function Popup({ isOpen, name, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [isOpen, onClose]);

  const closeByOverlay = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
      onClick={closeByOverlay}
    >
      <div className="popup__container">
        <button
          type="button"
          className="button button_type_close"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

export default Popup;
