import React, { useContext, useEffect, useState} from 'react'
import '../styles/box/candidateAdminBox.css'
import { DataExport } from '../context/GlobalContext'
import ModalWindow from '../pieces/ModalWindow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {showInfo} from '../scripts/Candidates'
import {removeCandidateForm} from '../scripts/AsignCandidates'

const CandidateBox = () => {

   const {candidateList, eventList, refreshCanddiateList, categoryTarget, dateLimit, setDateLimit, getDate, toDate} = useContext(DataExport)
   const [modal, setModal] = useState(false)
   const [modalData, setModalData] = useState({
      type: "",
      title: "",
      formId: "", 
      content: "", 
      onSubmit: () => {}
   })

   useEffect(()=>{//Verificar las fechas en la lista
      const eventAvailable = eventList.filter(e => parseInt(e.nro) === parseInt(categoryTarget) && toDate(e.limite_edicion) > getDate());
      if(eventAvailable.length){
         setDateLimit(false)
      }else{
         setDateLimit(true)
      }
   }, [categoryTarget, eventList, getDate, toDate, setDateLimit])
   
   return (
      <div className="box candidate-list-box">
         <div className="box-title">
            <p>Candidatos</p>
         </div>

         <div className="box-body">

            {
               candidateList ? 
               candidateList.map((e, index) => (
                  <div className="candidate-item" key={index}>
                     <p>{`${e.nombres} ${e.apellidos}`}</p>
                     <div className="option-list">
                        <div className="icon">
                           <FontAwesomeIcon
                              title="Detalles"
                              icon={faEye} 
                              className="icon t-green" 
                              onClick={() => {
                                 showInfo({
                                    nombre: `${e.nombres} ${e.apellidos}`,
                                    ci: `${e.carnet} ${e.dptocarnet}`,
                                    nacimiento: e.nacimiento,
                                    telf: e.celular,
                                    perfil: e.foto,
                                    setModalData
                                 })
                                 setModal(true)
                              }} 
                           />
                        </div>
                        {
                           !dateLimit ?
                           <>
                           <div className="icon">
                              <FontAwesomeIcon 
                                 title="Desvincular candidato"
                                 icon={faTrashAlt} 
                                 className="icon t-red" 
                                 onClick={() => {
                                    removeCandidateForm({
                                       nro: e.nro,
                                       category: categoryTarget,
                                       nombre: `${e.nombres} ${e.apellidos}`,
                                       refreshCanddiateList,
                                       setModalData
                                    })
                                    setModal(true)
                                 }} 
                              />
                           </div>
                           </>
                           :<></>
                        }
                     </div>
                  </div>
               ))
               : "Seleccione una categoría con candidatos disponibles..."
            }

         </div>
         {  modal ?

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
            : ""
         }

      </div>
   )
}

export default CandidateBox