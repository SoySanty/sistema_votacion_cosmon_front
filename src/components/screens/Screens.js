import React, { useState } from "react";
import Menu from "../box/Menu";
import ProfileBox from "../box/ProfileBox";
import "../styles/screens/screens.css";

import EventBox from "../box/EventBox";
import CandidateBox from "../box/CandidateBox";
import StatisticsBox from "../box/StatisticsBox";
import EventAdminBox from "../box/EventAdminBox";
import CategoryAdminBox from "../box/CategoryAdminBox";
import CandidateAdminBox from "../box/CandidateAdminBox";
import CandidateAdminList from "../box/CandidateAdminList";

//Cambiar el título de la página
const titlePage = (props) => {
  const titleTarget = {
    home: "Sistema de elecciones",
    eventos: "Administrar eventos",
    candidatos: "Administrar candidatos",
    usuario: "Gestion de usuario",
    login: "Inicio de sesion",
    default: "Página no encontrada",
  };
  document.title = titleTarget[props]
    ? titleTarget[props]
    : "Página no encontrada";
};

//Generador de contenido de la página (switch)
const contentPage = (props) => {
  const { target = "home" } = props;
  const content = {
    home: (
      <>
        <EventBox />
        <CandidateBox />
        <StatisticsBox />
      </>
    ),
    eventos: (
      <>
        <EventAdminBox />
        <CategoryAdminBox />
      </>
    ),
    candidatos: (
      <>
        <EventBox />
        <CandidateAdminBox />
        <CandidateAdminList />
      </>
    ),
  };
  return content[target] || <></>;
};

//--------------------------------------Default function
const Screens = ({ target }) => {
  const [menuActive, setMenuActive] = useState(false);

  titlePage(target);

  return (
    <section className="all-container">
      {/*   
            La propiedad "active" activará la opcion 
            seleccionada en el menú (className="active")  
         */}
      <Menu
        active={target}
        menuActive={menuActive}
        setMenuActive={setMenuActive}
      />

      <div className="container">
        <ProfileBox menuActive={menuActive} setMenuActive={setMenuActive} />

        <div className="box-container">{contentPage({ target })}</div>
      </div>
    </section>
  );
};

export default Screens;
