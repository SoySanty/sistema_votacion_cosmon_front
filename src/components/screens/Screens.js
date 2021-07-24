import React from 'react'
import Menu from '../box/Menu'
import ProfileBox from '../box/ProfileBox'
import '../styles/screens/screens.css'

import EventBox from '../box/EventBox'
import CandidateBox from '../box/CandidateBox'
import StatisticsBox from '../box/StatisticsBox'
import EventAdminBox from '../box/EventAdminBox'
import CategoryAdminBox from '../box/CategoryAdminBox';

//Cambiar el título de la página
const titlePage = props => {

   const titleTarget = {
      home: "Sistema de elecciones",
      login: "Inicio de sesion",
      default: "Página no encontrada",
   }
   document.title = titleTarget[props] ? titleTarget[props] : "Página no encontrada"

}

//Generador de contenido de la página (switch)
const contentPage = props => {

   const { target = "home" } = props
   const content = {
      home: 
      <>
         <EventBox />
         <CandidateBox />
         <StatisticsBox />
      </>,
      eventos: 
      <>
         <EventAdminBox />
         <CategoryAdminBox />
      </>
   }
   return content[target] || <></>

}

//--------------------------------------Default function
const Screens = ({ target }) => {
   
   titlePage(target);

   return (
      <section className="all-container">

         {/*   
            La propiedad "active" activará la opcion 
            seleccionada en el menú (className="active")  
         */}
         <Menu active={target} />

         <div className="container">

            <ProfileBox />

            <div className="box-container">
               {
                  contentPage({ target })
               }
            </div>

         </div>

      </section>
   )
}

export default Screens