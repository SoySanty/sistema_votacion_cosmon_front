import React from 'react'
import { MainUrl } from '../scripts/MainUrl';
import '../styles/box/profilebox.css';

const ProfileBox = () => {
   return (
      <div className="profile-box">
         <h2 className="profile-title">SISTEMA DE ELECCIONES</h2>
         <div className="profile-card">
            <div className="profile-text">
               <p className="profile-name">Lorenzo Santiago Saul Arias Villegas</p>
               <p className="profile-state">ADMINISTRADOR</p>
            </div>
            <img className="profile-img" src={`${MainUrl}view/img/default/profile.png`} alt="profile" />
         </div>
      </div>
   )
}

export default ProfileBox
