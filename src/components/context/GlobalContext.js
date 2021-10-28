import React, { createContext, useEffect, useState } from "react";
import { MainUrl } from "../scripts/MainUrl";

//Obtener lista de eventos y ejecutar un callback
const getEventList = async (props) => {
  const { executeFn } = props;
  const request = await fetch(`${MainUrl}?show=evento&target=mostrar_eventos`);
  const response = await request.json();
  executeFn(response);
};

//Obtener lista de candidatos y ejecutar un callback
const getCandidateList = async (props) => {
  const { executeFn, target } = props;
  const body = new FormData();
  body.append("nro_categoria", target);
  const url = `${MainUrl}?show=candidato&target=filtro1_candidatos`;
  const data = { method: "POST", body: body };
  const request = await fetch(url, data);
  const response = await request.json();
  executeFn(response);
};

export const DataExport = createContext();
export const GlobalContext = ({ children }) => {
  //=================Candidate Screen
  const [imgCache, setImgCache] = useState(Math.random());

  //=================Home Screen
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    //Llamar Lista de Eventos
    getEventList({ executeFn: setEventList });
  }, [setEventList]);

  const refreshEventList = () => getEventList({ executeFn: setEventList }); //Actualizar la lista de eventos
  const refreshCanddiateList = () =>
    getCandidateList({
      executeFn: setCandidateList,
      target: categoryTarget,
    }); //Actualizar la lista de eventos

  const [candidateList, setCandidateList] = useState();
  const [categoryTarget, setCategoryTarget] = useState(0);

  useEffect(() => {
    //Llamar Lista de Candidatos
    getCandidateList({
      executeFn: setCandidateList,
      target: categoryTarget,
    });
  }, [categoryTarget]);

  //=================Event Screen
  const [eventTarget, setEventTarget] = useState(0);
  const [dateLimit, setDateLimit] = useState(false);
  const getDate = () => {
    //Obtener fecha
    let date = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    date = new Date(date);
    return date;
  };
  const toDate = (e) => {
    //De string a date
    let date = new Date(e);
    return date;
  };

  //=================Objeto con las variables a exportar
  const dataExport = {
    eventList,
    categoryTarget,
    setCategoryTarget,
    candidateList,
    setCandidateList,
    eventTarget,
    setEventTarget,
    refreshEventList,
    imgCache,
    setImgCache,
    refreshCanddiateList,
    getDate,
    toDate,
    dateLimit,
    setDateLimit,
  };
  return (
    <DataExport.Provider value={dataExport}>{children}</DataExport.Provider>
  );
};
