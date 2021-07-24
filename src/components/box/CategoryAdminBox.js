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

const CategoryAdminBox = () => {

   const {eventTarget, setEventTarget, eventList} = useContext(DataExport)
   const [categoryList, setCategoryList] = useState([])
   const [modal, setModal] = useState(false);
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
      const getCategoryList = async () =>{
         const body = new FormData()
         body.append("nro_evento", eventTarget)
         const url = `${MainUrl}?show=categoria&target=filtrar_categoria`
         const data = {
            method: "POST",
            body
         }
         const request = await fetch(url, data)
         const response = await request.json()
         setCategoryList(response);
      }
      getCategoryList()
   }, [eventTarget])
   
   
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
                                       setModalData
                                    })
                                    setModal(true)
                                 }} 
                              />
                           </div>
                        </div>
                     </div>
                  ))
                  : "Seleccione un evento que contenga categorías..."
               }
            </div> 
            <Button 
               className = "add-event-button"
               text = "Agregar una categoría"
               onClick = {()=>{
                  insertCategoryForm({setModalData, eventList})
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
