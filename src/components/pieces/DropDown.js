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

   return (
      <div
         className={`dropdown-a-container ${className}`}
         onClick={(e) =>{
            const lists = document.querySelectorAll(".dropdown-list")
            const get = e =>{
               if(e.classList.contains("dropdown-a-container")){
                  return e
               }else{
                  return get(e.parentNode)
               }
            }
            const list = get(e.target).querySelector(".dropdown-list")
            let height = 0
            if(list.clientHeight === 0){
               height = list.scrollHeight
            }
            lists.forEach( e => e.style.height = 0 )
            list.style.height = `${height}px`
         }}
      >

         <div className="dropdown-title">
            <p>{titleDropdown}</p>
            <FontAwesomeIcon icon={faChevronDown} className={`icon`} />
         </div>

         <div 
            className={`dropdown-list`} 
            id="dropDownList"
         >

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
