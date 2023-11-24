import React from "react";
import { NavLink } from "react-router-dom";

import "./styles.css";

const NavBar = (): JSX.Element => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__name">
          <p>Bttr</p>
        </div>
        <div className="navbar__actions">
          <NavLink className="navbar__link" to="/home">
            <p className="navbar__action--margin">Início</p>
          </NavLink>
          <NavLink className="navbar__link" to="/times">
            <p className="navbar__action--margin">Tempo</p>
          </NavLink>
          <NavLink className="navbar__link" to="/profile">
            <p className="navbar__action--margin">Perfil</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
