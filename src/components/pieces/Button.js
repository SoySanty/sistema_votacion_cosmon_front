import React from 'react'
import '../styles/pieces/button.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faCalendarPlus,
   faCalendar,
   faPlus,
   faCalendarDay,
   faAddressCard,
   faUserPlus,
   faPortrait
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
      'admin-event': <FontAwesomeIcon icon={faCalendar} className="icon" />,
      'add-event': <FontAwesomeIcon icon={faCalendarPlus} className="icon" />,
      'add-category': <FontAwesomeIcon icon={faCalendarDay} className="icon" />,
      'add-something': <FontAwesomeIcon icon={faPlus} className="icon" />,
      'admin-candidate': <FontAwesomeIcon icon={faAddressCard} className="icon" />,
      'add-candidate': <FontAwesomeIcon icon={faUserPlus} className="icon" />,
      'asign-candidate': <FontAwesomeIcon icon={faPortrait} className="icon" />,
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