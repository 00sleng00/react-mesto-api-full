import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../images/mesto.svg";

function Header({ loggedIn, emailAuthorized, onLogOut }) {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  function handleOpenNav() {
    setIsNavOpen(!isNavOpen);
  }

  function handleOnLogOut() {
    setIsNavOpen(false);
    onLogOut();
  }

  return (
    <header
      className={loggedIn ? "header header_mobile" : "header header_logout"}
    >
      {loggedIn && (
        <div
          className={
            isNavOpen
              ? "header__container header__container_visible"
              : "header__container"
          }
        >
          <p className="header__email">{loggedIn ? emailAuthorized : ""}</p>
          <button
            type="button"
            className="header__button"
            onClick={handleOnLogOut}
          >
            Выйти
          </button>
        </div>
      )}
      <div
        className={
          loggedIn
            ? "header__main-content"
            : "header__main-content header__main-content_logout"
        }
      >
        <img src={logo} alt="Место" className="header__logo" />
        {loggedIn ? (
          <button
            type="button"
            className={
              isNavOpen ? "header__close-nav" : "header__burger-button"
            }
            onClick={handleOpenNav}
          />
        ) : (
          <nav>
            {location.pathname === "/signin" && (
              <Link className="header__link" to={"/signup"}>
                Регистрация
              </Link>
            )}
            {location.pathname === "/signup" && (
              <Link className="header__link" to={"/signin"}>
                Войти
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
