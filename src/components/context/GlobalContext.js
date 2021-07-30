import React, { createContext, useEffect, useState } from 'react'
import { MainUrl } from '../scripts/MainUrl';

//Obtener lista de eventos y ejecutar un callback
const getEventList = async props => {
   const {executeFn} = props;
   const request = await fetch(`${MainUrl}?show=evento&target=mostrar_eventos`) 
   const response = await request.json();
   executeFn(response);
}

//Obtener lista de candidatos y ejecutar un callback
const getCandidateList = async (props) => {
   const {executeFn, target} = props;
   const body = new FormData();
   body.append('nro_categoria', target);
   const url = `${MainUrl}?show=candidato&target=filtro1_candidatos`;
   const data = { method: 'POST', body: body }
   const request = await fetch(url, data)
   const response = await request.json()
   executeFn(response)
}


export const DataExport = createContext();
export const GlobalContext = ({ children }) => {
   
   //=================Home Screen
   const [eventList, setEventList] = useState([]);
   //Llamar Lista de Eventos
   useEffect(()=>{
      getEventList({executeFn: setEventList});
   }, [setEventList]);

   const [candidateList, setCandidateList] = useState();   
   const [categoryTarget, setCategoryTarget] = useState(0);

   //Llamar Lista de Candidatos
   useEffect(()=>{ 
         getCandidateList({
            executeFn: setCandidateList, 
            target: categoryTarget
         });
   }, [categoryTarget]);

   //=================Event Screen
   const [eventTarget, setEventTarget] = useState(0);
   
   //=================Candidate Screen

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