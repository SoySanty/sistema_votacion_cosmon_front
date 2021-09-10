import React, { useContext, useEffect, useState } from 'react'
import '../styles/box/eventbox.css';
import { DropDownA } from '../pieces/DropDown';
import Button from '../pieces/Button';
import {DataExport} from '../context/GlobalContext';
import { MainUrl } from '../scripts/MainUrl';
import { Link } from 'react-router-dom';

const EventBox = () => {

   /*
   Extrayendo datos del contexto global y preparandolos 
   para enlistarlos en el dropdown
   */
   const {
      eventList,
      setCategoryTarget,
   } = useContext(DataExport)
   
   //Nro de evento para extraer lista de categorías
   const [eventTarget, setEventTarget] = useState(0);

   //Evento click en los items del dropdown
   const setNroEventTarget = e => {
      setEventTarget(e);
   }
   const setNroCategoryTarget = e => {
      setCategoryTarget(e);
   }

   //Lista de categorias
   const [categoryList, setCategoryList] = useState([]);
   useEffect(()=>{
      setCategoryTarget(0);
   }, [categoryList, setCategoryTarget]);

   //Extrae la lista de categorias cada que eventTarget cambia
   useEffect(()=>{

      const getEventList = async () => {
         const body = new FormData();
         body.append('nro_evento', eventTarget);
         const url = `${MainUrl}?show=categoria&target=filtrar_categoria`;
         const data = { method: 'POST', body: body }
         const request = await fetch(url, data);
         const response = await request.json();
         setCategoryList( response );
      }
      getEventList();

   },[eventTarget]);
   

   return (
      <div className="box event-box">
         <div className="box-title">
            <p>Eventos</p>
         </div>

         <div className="box-body">

            <DropDownA
               className="dropdown"
               titleText="Seleccione un evento"
               data={eventList ? eventList : [{text: "Sin datos...", nro: null}]}
               textKey = "evento"
               idKey = "nro"
               onClick = {setNroEventTarget}
            />

            <DropDownA
               className="dropdown"
               titleText="Seleccione una categoria"
               data = {categoryList ? categoryList : [{text: "Sin datos...", nro: null}]}
               textKey = {categoryList ? "categoria" : "text"}
               idKey = {categoryList ? "nro" : "id"}
               onClick = {setNroCategoryTarget}
            />
            
            <Link to="/eventos" className="link-button">
               <Button
                  className="btn-admin-event"
                  type="admin-event"
                  text="Administrar eventos"
               />
            </Link>


         </div>


      </div>
   )
}

export default EventBox
