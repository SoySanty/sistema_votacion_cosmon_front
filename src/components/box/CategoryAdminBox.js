import React, {useContext, useEffect, useState} from 'react'
import { DataExport } from '../context/GlobalContext'
import { MainUrl } from '../scripts/MainUrl'
import '../styles/box/categoryAdminBox.css'
import ModalWindow from '../pieces/ModalWindow'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons'
import {
   insertCategoryForm,
   updateCategoryForm,
   showCategoryDetails,
   removeCategoryForm
} from '../scripts/Category'
import Button from '../pieces/Button'

const getCategoryList = async props =>{
   const {actionFn, target} = props;
   const body = new FormData()
   body.append("nro_evento", target)
   const url = `${MainUrl}?show=categoria&target=filtrar_categoria`
   const data = {
      method: "POST",
      body
   }
   const request = await fetch(url, data)
   const response = await request.json()
   actionFn(response);
}

const CategoryAdminBox = () => {

   const {eventTarget, setEventTarget, eventList, dateLimit, getDate, toDate} = useContext(DataExport)
   const [categoryList, setCategoryList] = useState([])
   const [modal, setModal] = useState(false)
   const [refresh, setRefresh] = useState(0)
   const [eventUnable, setEventUnabe] = useState([])//Lista de eventos disponbles
   const [modalData, setModalData] = useState({
         type: "",
         title: "",
         formId: "", 
         content: "", 
         onSubmit: () => {}
      });
   useEffect(() => {
      setEventTarget(0)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   useEffect(()=>{
      getCategoryList({
         actionFn: setCategoryList, 
         target: eventTarget
      })
      setRefresh(0)
   }, [eventTarget, refresh])
   //Filtrar lista de eventos los cuales pueden ser editados
   useEffect(()=>{ 
      const eventFilter = eventList.filter( e => toDate(e.limite_edicion) > getDate() )
      setEventUnabe(eventFilter)
   },[eventList, getDate, toDate])
   
   return (
      <div className="box category-admin-box">

         <div className="box-title">
            <p>Lista de categorías</p>
         </div>

         <div className="box-body">
            <div className="category-list">
               {
                  categoryList ? 
                  categoryList.map((e, index) => (
                     <div 
                        className="category-item" 
                        key={index}
                     >
                        <p>{`${e.categoria}`}</p>
                        <div className="option-list">
                           <div className="icon">
                              <FontAwesomeIcon 
                                 title="Detalles"
                                 icon={faEye} 
                                 className="icon t-green" 
                                 onClick={() => {
                                    showCategoryDetails({
                                       category: e.categoria,
                                       nroEvent: e.nro_evento,
                                       eventList,
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
                                    title="Modificar"
                                    icon={faEdit} 
                                    className="icon t-blue" 
                                    onClick={() => {
                                       updateCategoryForm({
                                          idEvent: e.nro_evento,
                                          idCategory: e.nro,
                                          category: e.categoria,
                                          eventList,
                                          setRefresh,
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
                                       removeCategoryForm({
                                          idCategory: e.nro,
                                          category: e.categoria,
                                          setRefresh,
                                          setModalData
                                       })
                                       setModal(true)
                                    }} 
                                 />
                              </div>
                           </>

                           : <></>
                           }
                        </div>
                     </div>
                  ))
                  : "Seleccione un evento que contenga categorías..."
               }
            </div> 
            <Button 
               className = "add-event-button"
               text = "Agregar una categoría"
               type = "add-category"
               onClick = {()=>{
                  insertCategoryForm({setModalData, eventList: eventUnable, setRefresh})
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

export default CategoryAdminBox
