import React from "react";

function Footer({ loggedIn }) {
  return (
    <footer className={loggedIn ? "footer" : "footer_hidden"}>
      <p className="footer__copyright">
        {new Date().getFullYear()} Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
