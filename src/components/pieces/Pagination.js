import React from 'react'
import '../styles/pieces/pagination.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faChevronLeft,
   faChevronRight
} from '@fortawesome/free-solid-svg-icons'

const Pagination = props => {
   const {
      target = 1,
      numPages = 1,
      click = ()=>{}
   } = props;
   let list = []

   if(numPages > 0){
      for(let i = 1; i <= numPages; i++){
         list = [...list, i]
      }
   }else{
      list = [1]
   }

   const prev = target - 1 > 1 ? target - 1 : 1
   const next = target + 1 > list[list.length - 1]  ? target : target + 1
   return (
      <div className="pagination-container">
         <ul>
            <li 
            className="next-prev"
            onClick={()=>{click(prev)}}
            >
               <FontAwesomeIcon icon={faChevronLeft} className="icon" />
               <span>
                  Ant
               </span>
            </li>
            {
               list.map((e,index)=>(
               <li 
               key={index}
               className={`item ${ index === target - 1 ? "active" : ""}`}
               onClick={()=>click(index + 1)}
               >
               {e}
               </li>
            ))
         }
            <li 
            className="next-prev"
            onClick={()=>{click(next)}}
            >
               <span>
                  Sig
               </span>
               <FontAwesomeIcon icon={faChevronRight} className="icon" />
            </li>
         </ul>
      </div>
   )
}

export default Pagination
