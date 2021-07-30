import React, {useContext, useState} from 'react'
import '../styles/box/eventAdminBox.css'
import {DataExport} from '../context/GlobalContext'
import Button from '../pieces/Button'
import ModalWindow from '../pieces/ModalWindow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import {
   insertEventForm,
   updateEventForm,
   showEventDetails,
   removeEventForm
} from '../scripts/Events'


const EventAdminBox = () => {

   const [modal, setModal] = useState(false);
   const {
      eventList,
      setEventTarget
   } = useContext(DataExport);
   const [
      modalData, 
      setModalData
   ] = useState({
         type: "",
         title: "",
         formId: "", 
         content: "", 
         onSubmit: () => {}
      });

   //Agregar la clase 'active' al elemento seleccionado
   const activeList = target => {
      const list = document.querySelectorAll('.event-item');
      list.forEach(e => e.className = "event-item");
      list[target].classList.add("active");
   }
   
   return (
      <div className="box event-admin-box">

         <div className="box-title">
            <p>Lista de eventos</p>
         </div>

         <div className="box-body">

            <div className="event-list">

            {
               eventList ? 
               eventList.map((e, index) => (
                  <div 
                     className="event-item" 
                     key={index}
                     onClick={()=>{
                        setEventTarget(e.nro)
                        activeList(index)
                     }}
                  >
                     <p>
                        {`${e.evento}`} <br/>
                        <span className="date-event">
                           {`${e.inicio} | ${e.final}`}
                        </span>
                     </p>
                     <div className="option-list">
                        <div className="icon">
                           <FontAwesomeIcon 
                              title="Detalles"
                              icon={faEye} 
                              className="icon t-green" 
                              onClick={() => {
                                 showEventDetails({
                                    event: e.evento,
                                    inicio: e.inicio,
                                    elecciones: e.dia_elecciones,
                                    finalElecciones: e.dia_elecciones_final,
                                    final: e.final,
                                    setModalData
                                 })
                                 setModal(true)
                              }} 
                           />
                        </div>
                        <div className="icon">
                           <FontAwesomeIcon 
                              title="Modificar"
                              icon={faEdit} 
                              className="icon t-blue" 
                              onClick={() => {
                                 updateEventForm({
                                    idEvent: e.nro,
                                    event: e.evento,
                                    inicio: e.inicio,
                                    final: e.final,
                                    elecciones: e.dia_elecciones,
                                    finalElecciones: e.dia_elecciones_final,
                                    setModalData
                                 })
                                 setModal(true)
                              }} 
                           />
                        </div>
                        <div className="icon">
                           <FontAwesomeIcon 
                              title="Eliminar"
                              icon={faTrashAlt} 
                              className="icon t-red" 
                              onClick={() => {
                                 removeEventForm({
                                    idEvent: e.nro,
                                    event: e.evento,
                                    setModalData
                                 })
                                 setModal(true)
                              }} 
                           />
                        </div>
                     </div>
                  </div>
               ))
               : "No hay eventos disponibles..."
            }

            </div>

            <Button 
               className = "add-event-button"
               text = "Agregar un evento"
               onClick = {()=>{
                  insertEventForm({setModalData})
                  setModal(true)
               }}
            />
         </div>    
         {
         modal ? 
         <ModalWindow 
            formId = {modalData.formId}
            type = {modalData.type}
            title = {modalData.title}
            content = {modalData.content}
            modalClose = {()=>{
               setModal(false)
            }}
            onSubmit = {modalData.onSubmit}
         />
         : <></>
         }
      </div>
   )
}

export default EventAdminBox
