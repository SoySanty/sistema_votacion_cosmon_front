import React, { useContext} from 'react'
import '../styles/box/candidateBox.css'
import Button from '../pieces/Button'
import {Link} from 'react-router-dom'
import { DataExport } from '../context/GlobalContext'

const CandidateBox = () => {

   const {candidateList} = useContext(DataExport);
   
   return (
      <div className="box candidate-box">
         <div className="box-title">
            <p>Candidatos</p>
         </div>

         <div className="box-body">

            {
               candidateList ? 
               candidateList.map((e, index) => (
                  <div className="candidate-item" key={index}>
                     {`${e.nombres} ${e.apellidos}`}
                  </div>
               ))
               : "Seleccione una categoría con candidatos disponibles..."
            }

            <Link to="/candidatos">
               <Button
                  className="btn-admin-candidate"
                  type="admin-candidate"
                  text="Administrar candidatos"
               />
            </Link>

         </div>        

      </div>
   )
}

export default CandidateBox
