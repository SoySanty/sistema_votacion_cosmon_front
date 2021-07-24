import React from 'react'
import '../styles/pieces/button.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCalendarPlus,
   faAddressCard
} from '@fortawesome/free-solid-svg-icons';

const Button = (props) => {

   //texto que se va a usar en el boton
   const {
      className = "",
      type = "default",
      text = "Enter",
      onClick = null
   } = props;

   //Define el tipo de botón
   const btnList = {
      'admin-event': <FontAwesomeIcon icon={faCalendarPlus} className="icon" />,
      'admin-candidate': <FontAwesomeIcon icon={faAddressCard} className="icon" />,
      default: <></>
   }

   return (
      <button className={`btn ${className}`} onClick={onClick ? onClick : ()=>{}}>
         {btnList[type]}
         {text}
      </button>
   )
}

export default Button