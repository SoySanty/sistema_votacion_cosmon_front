import React, { useEffect, useState } from 'react'
import '../styles/pieces/dropDown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faChevronDown,
} from '@fortawesome/free-solid-svg-icons'

export const DropDownA = props => {

   /*
      Los parámetros 
      textKey = 'Nombre de la casilla dentro del objeto'
      idKey = 'Id de la casilla para reconocer el item'
      son indispensables para el
      funcionamiento correcto del dropdown
   */
   const {
      textKey = "text",
      idKey = "id",
      className = "",
      titleText = "Sin título",
      data = [{ text: "No hay datos...", id: 0}],
      onClick = ()=>{}
   } = props;

   const [titleDropdown, setTitleDropdown] = useState(titleText);

   useEffect(()=>{
      setTitleDropdown(titleText)
   },[data, titleText]);
      
   //para colapsar o no las listas
   const [collapse, setCollapse] = useState(false);
   const clickDropdown = () => {
      collapse ? setCollapse(false) : setCollapse(true);
   }

   return (
      <div
         className={`dropdown-a-container ${className}`}
         onClick={() => {
            clickDropdown();
         }}
      >

         <div className="dropdown-title">
            <p>{titleDropdown}</p>
            <FontAwesomeIcon icon={faChevronDown} className={`icon ${collapse ? "active" : ""}`} />
         </div>

         <div className={`dropdown-list ${collapse ? "enable" : ""}`} id="dropDownList">

            {
               data.map( (e, index)=> (
                  <div 
                  className="dropdown-item"
                  key={index}
                  onClick={()=>{
                     setTitleDropdown(e[textKey])
                     onClick(e[idKey]);
                  }}
                  >
                     {e[textKey]}
                  </div>
               ) )
            }

         </div>

      </div>
   )
}
