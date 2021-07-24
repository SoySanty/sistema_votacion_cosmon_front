import React, { createContext, useEffect, useState } from 'react'
import { MainUrl } from '../scripts/MainUrl';

export const DataExport = createContext();

export const GlobalContext = ({ children }) => {
   
   //-----------------Home Screen
   const [eventList, setEventList] = useState([]);
   //Obtener Lista de Eventos
   useEffect(()=>{
   const getEventList = async () => {
      const request = await fetch(`${MainUrl}?show=evento&target=mostrar_eventos`) 
      const response = await request.json();
      setEventList(response);
   }
      getEventList();
   }, [setEventList]);
   const [candidateList, setCandidateList] = useState();   
   const [categoryTarget, setCategoryTarget] = useState(0);
   //Obtener Lista de Candidatos
   useEffect(()=>{ 
      const getCandidateList = async () => {
         const body = new FormData();
         body.append('nro_categoria', categoryTarget);
         const url = `${MainUrl}?show=candidato&target=filtro1_candidatos`;
         const data = { method: 'POST', body: body }
         const request = await fetch(url, data);
         const response = await request.json();
         setCandidateList( response );
      }
         getCandidateList();
   }, [categoryTarget]);

   //-----------------Event Screen
   const [eventTarget, setEventTarget] = useState(0);
   

   //Objeto con las variables a exportar
   const dataExport = {
      eventList,
      categoryTarget,
      setCategoryTarget,
      candidateList,
      setCandidateList,
      eventTarget,
      setEventTarget
   }
   return (
      <DataExport.Provider value={dataExport} >
         {children}
      </DataExport.Provider>
   );

}