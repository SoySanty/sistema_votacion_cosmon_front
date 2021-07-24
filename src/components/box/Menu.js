import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/box/menu.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faHome,
   faAddressCard,
   faCalendar,
   faChartBar
} from '@fortawesome/free-solid-svg-icons'

const Menu = ({ active }) => {

   const switchActive = target => active === target ? "active" : "";

   return (
      <div className="menu-container">

         <div className="stick-menu">


            <Link to="/">
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
                     <Link to="/">
                        <li className={switchActive("home")}>
                           <FontAwesomeIcon icon={faHome} className="icon" />
                           Inicio
                        </li>
                     </Link>
                     <Link to="/eventos">
                        <li className={switchActive("eventos")}>
                           <FontAwesomeIcon icon={faCalendar} className="icon" />
                           Eventos
                        </li>
                     </Link>
                     <Link to="/candidatos">
                        <li className={switchActive("candidatos")}>
                           <FontAwesomeIcon icon={faAddressCard} className="icon" />
                           Candidatos
                        </li>
                     </Link>
                     <Link to="/estadisticas">
                        <li className={switchActive("estadisticas")}>
                           <FontAwesomeIcon icon={faChartBar} className="icon" />
                           Estadísticas
                        </li>
                     </Link>
                  </ul>
               </nav>
            </header>

         </div>

      </div>
   )
}

export default Menu
