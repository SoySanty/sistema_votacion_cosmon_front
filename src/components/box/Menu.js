import React from "react";
import { Link } from "react-router-dom";
import "../styles/box/menu.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faHome,
  faAddressCard,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

const Menu = (props) => {
  const { active, menuActive, setMenuActive } = props;

  const switchActive = (target) => (active === target ? "active" : "");

  return (
    <div
      className={`menu-container ${menuActive && "menu-active"}`}
      onClick={(e) => {
        if (e.target.classList.contains("menu-container")) {
          setMenuActive(false);
        }
      }}
    >
      <div className="stick-menu">
        <Link to="/" onClick={() => setMenuActive(false)}>
          <div className="logo">
            <div className="border-logo">
              <p className="logo-title">COSMON</p>
              <p className="logo-subtitle">VALLEGRANDE</p>
            </div>
          </div>
        </Link>

        <header className="header">
          <p className="menu-title">MENÚ</p>

          <nav>
            <ul>
              <Link to="/" onClick={() => setMenuActive(false)}>
                <li className={switchActive("home")}>
                  <FontAwesomeIcon icon={faHome} className="icon" />
                  Inicio
                </li>
              </Link>
              <Link to="/eventos" onClick={() => setMenuActive(false)}>
                <li className={switchActive("eventos")}>
                  <FontAwesomeIcon icon={faCalendar} className="icon" />
                  Eventos
                </li>
              </Link>
              <Link to="/candidatos" onClick={() => setMenuActive(false)}>
                <li className={switchActive("candidatos")}>
                  <FontAwesomeIcon icon={faAddressCard} className="icon" />
                  Candidatos
                </li>
              </Link>
              <Link to="/usuario" onClick={() => setMenuActive(false)}>
                <li className={switchActive("usuario")}>
                  <FontAwesomeIcon icon={faUsersCog} className="icon" />
                  Usuario
                </li>
              </Link>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  );
};

export default Menu;
