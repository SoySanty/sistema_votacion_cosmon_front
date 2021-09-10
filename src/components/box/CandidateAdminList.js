import React, {useContext, useEffect, useState} from 'react'
import '../styles/box/candidateAdminList.css'
import Pagination from '../pieces/Pagination'
import { MainUrl } from '../scripts/MainUrl'
import ModalWindow from "../pieces/ModalWindow"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faEye, faUpload } from '@fortawesome/free-solid-svg-icons'
import { asignCandidateForm } from '../scripts/AsignCandidates'
import Button from '../pieces/Button'
import { 
   showInfo, 
   insertCandidateForm,
   getCandidateList,
   getCandidatePagination,
   updateCandidateForm,
   removeCandidateForm,
} from '../scripts/Candidates'
import { DataExport } from '../context/GlobalContext'

const StatisticsBox = () => {

   const {imgCache, setImgCache, eventList, setEventTarget, refreshEventList, getDate, toDate} = useContext(DataExport)
   const [numPages, setNumPages] = useState(1) //Numero de páginas
   const [targetPag, setTargetPag] = useState(1) //Target en el pagination
   const [candidateList, setCandidateList] = useState([]) //Lista de candidatos
   const [refreshFlag, setRefreshFlag] = useState(0) //Para refrescar la lista de candidatos
   const [eventUnable, setEventUnabe] = useState([])

   //Variables relacionadas con la ventana modal
   const [modal, setModal] = useState(0)
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

   useEffect(()=>{
      getCandidatePagination({setNumPages})
   }, [])

   useEffect(()=>{
      getCandidateList({targetPag, setCandidateList})
      setRefreshFlag(0)
   },[targetPag, refreshFlag])

   //Filtrar lista de eventos los cuales pueden ser editados
   useEffect(()=>{ 
      const eventFilter = eventList.filter( e => toDate(e.limite_edicion) > getDate() )
      setEventUnabe(eventFilter)
   },[eventList, getDate, toDate])
   
   return (
      <div className="box candidate-list">
         <div className="box-title">
            <p>Lista de candidatos</p>
         </div>

         <div className="box-content box-body">

            <div className="header-table">
               
               <Button
                  className="btn btn-admin-candidate"
                  type="add-something"
                  text="Agregar un candidato"
                  onClick={()=>{
                     insertCandidateForm({setModalData, setRefreshFlag})
                     setModal(true)
                  }}
               />

               <Pagination 
                  target = {targetPag}
                  numPages = {numPages}
                  click = {setTargetPag}
               />

            </div>
            
            <table className="candidate-table-container">
               <thead>
                  <tr>
                     <td>Foto</td>
                     <td>Nombre completo</td>
                     <td>Carnet de identidad</td>
                     <td>Opciones</td>
                  </tr>
               </thead>
               <tbody>
                  {
                  candidateList ?
                  candidateList.map((e, index)=>(
                     <tr key={index}>
                        <td className="profile-container">
                           <div className="profile-photo">
                              <img src={MainUrl + e.perfil + "?" + imgCache} alt="" />
                           </div>
                        </td>
                        <td>{e.apellidos} {e.nombre}</td>
                        <td>{e.ci} {e.ci_dpto.toLowerCase()}</td>
                        <td>
                           <div className="option-list">
                              <div className="icon">
                                 <FontAwesomeIcon 
                                    title="Detalles"
                                    icon={faEye} 
                                    className="icon t-green" 
                                    onClick={() => {
                                       showInfo({
                                          nombre: `${e.nombre} ${e.apellidos}`,
                                          ci: `${e.ci} ${e.ci_dpto}`,
                                          nacimiento: e.nacimiento,
                                          telf: e.telefono,
                                          perfil: e.perfil,
                                          imgCache,
                                          setModalData
                                       })
                                       setModal(true)
                                    }} 
                                 />
                              </div>
                              <div className="icon">
                                 <FontAwesomeIcon 
                                    title="Asignar a evento"
                                    icon={faUpload} 
                                    className="icon t-orange" 
                                    onClick={() => {
                                       asignCandidateForm({
                                          nro: e.nro,
                                          nombre: `${e.nombre} ${e.apellidos}`,
                                          eventList: eventUnable,
                                          setEventTarget,
                                          refreshEventList,
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
                                       updateCandidateForm({
                                          nro: e.nro,
                                          nombre: e.nombre,
                                          apellidos: e.apellidos,
                                          ci: e.ci,
                                          ci_dpto: e.ci_dpto,
                                          nacimiento: e.nacimiento,
                                          telf: e.telefono,
                                          perfil: e.perfil,
                                          setModalData,
                                          setRefreshFlag,
                                          imgCache,
                                          setImgCache
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
                                       removeCandidateForm({
                                          nro: e.nro,
                                          nombre: e.nombre,
                                          apellidos: e.apellidos,
                                          setModalData,
                                          setRefreshFlag
                                       })
                                       setModal(true)
                                    }} 
                                 />
                              </div>
                           </div>

                        </td>
                     </tr>
                  ))
                  : <tr>
                     <td colSpan="4">No hay candidatos disponibles en la lista...</td>
                  </tr>
                  }
               </tbody>
            </table>
            
         </div>

         {
         modal?
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

export default StatisticsBox
