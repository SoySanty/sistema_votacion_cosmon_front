import React, {useContext, useEffect, useState} from 'react'
import '../styles/box/statisticsBox.css';
import { DataExport } from '../context/GlobalContext';
import Chart from "react-google-charts";

const StatisticsBox = () => {

   const {candidateList} = useContext(DataExport);
   const [chartData, setChartData] = useState([]);

   useEffect(()=>{

      if(candidateList){

         const aux = candidateList.map((e, index) => [
            `${e.apellidos} ${e.nombres}`, 
            parseInt(e.cantidad_votos), 
            `color: ${index % 2 === 0 ? "#20818C" : "#262626"}`
         ])
         setChartData([["Candidatos", "Votos", { role: "style" }],...aux]);

      }
      
   },[candidateList])
   
   return (
      <div className="box statistics-box">
         <div className="box-title">
            <p>Estadísticas</p>
         </div>

         <div className="statistics-chart">
            <div className="chart">
               {
                  candidateList ? (

                  <Chart 
                     chartType = "BarChart"
                     loader={<p>Canrgando...</p>}
                     width = "100%"
                     height = "20rem"
                     data = {chartData}
                     options =  {
                        {
                           // title: 'Resultados: ',
                           chartArea: { width: '60%' },
                           hAxis: {
                             title: 'Cantidad de votos',
                             minValue: 0,
                           },
                           vAxis: {
                             title: 'Lista de candidatos',
                           },
                         }
                     }
                  />

                  ) : "Seleccione una categoría con candidatos disponibles..."
               }
            </div>
         </div>
      </div>
   )
}

export default StatisticsBox
