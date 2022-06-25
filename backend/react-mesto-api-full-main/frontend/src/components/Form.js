import React from "react";

function Form({name, onSubmit, children, isLoading, loadingTextBtn, textBtn}) {
    return (
        <form
          className="form"
          name={`${name}Form`}
          onSubmit={onSubmit}
        >
          <div className="form__content">{children}</div>
          <button type="submit" className="button button_type_submit">
            {isLoading ? loadingTextBtn : textBtn}
          </button>
        </form>
    )
}

export default Form;