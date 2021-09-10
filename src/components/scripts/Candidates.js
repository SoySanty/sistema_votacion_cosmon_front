import { MainUrl} from "./MainUrl"

/*
En este archivo se encuantran las funciones que generan
los formularios para crear, visuailizar, modificar y eliminar
candidatos
*/

//Para refrescar la lista de candidatos
let refresh = () =>{}
let refreshCache = () =>{}

//Formulario para insertar un nuevo candidato
export const insertCandidateForm = props => {

   const {
      setModalData,
      setRefreshFlag
   } = props

   const content = (
      <>
         <div className="picture">
            <p id="errorPicture">Cargar una foto de perfil</p>

            <label htmlFor="perfil_cand">
               <img src={`${MainUrl}view/img/default/load-img.png`} alt="" id="profileImage"/>
            </label>
            <input
            type="file"
            id="perfil_cand"
            name="perfil_cand"
            accept=".jpg, .png"
            className="disabled"
            onChange={e=>{
               const img = document.querySelector("#profileImage")
               const error = document.querySelector("#errorPicture")
               let file = e.target.files[0]

               if(file  && file.size < 1000000 && (file.type === "image/jpeg" || file.type === "image/png")){
                  file = URL.createObjectURL(file)
                  img.src = file
                  error.textContent = e.target.files[0].name
               }else{
                  error.textContent = "Seleccione imágenes no mayores de 1Mb"
                  e.target.value = ""
                  img.src = `${MainUrl}view/img/default/load-img.png`
               }
            }}
            />
         </div>
         <label htmlFor="nombres">Nombre</label>
         <input type="text" required name="nombres" placeholder="Nombre del candidato" autoComplete="off"/>
         <label htmlFor="apellidos">Apellidos</label>
         <input type="text" required name="apellidos" placeholder="Apellidos del candidato" autoComplete="off"/>
         <label htmlFor="ci">Carnet de identidad</label>
         <div className="twoSections">
            <input type="number" required name="ci" placeholder="Ci del candidato" autoComplete="off"/>
            <select name="ci_dpto" required>
               <option value="SC">Santa Cruz</option>
               <option value="CB">Cochabamba</option>
               <option value="LP">La Paz</option>
               <option value="BN">Beni</option>
               <option value="PA">Pando</option>
               <option value="TJ">Tarija</option>
               <option value="CH">Chuquisaca</option>
               <option value="OR">Oruro</option>
               <option value="PT">Potosí</option>
            </select>
         </div>
         <label htmlFor="nacimiento">Fecha de nacimiento</label>
         <input type="date" name="nacimiento" required/>
         <label htmlFor="telf">Teléfono</label>
         <input type="number" required name="telf" placeholder="Número de teléfono" autoComplete="off"/>
      </>
   );

   refresh = setRefreshFlag

   setModalData({
      type: "multipartForm",
      title: "Agregar un candidato",
      formId: "agregarCandidato",
      content,
      onSubmit: insertCandidate,
      refresh: setRefreshFlag
   });
}

//Formulario para modificar un nuevo candidato
export const updateCandidateForm = props =>{
   const {
      nro,
      nombre,
      apellidos,
      ci,
      ci_dpto,
      nacimiento,
      telf,
      perfil,
      setModalData,
      setRefreshFlag,
      imgCache,
      setImgCache
   } = props

   const content = (
      <>
         <div className="picture">
            <p id="errorPicture">Cargar una foto de perfil</p>

            <label htmlFor="perfil">
               <img src={MainUrl + perfil + "?" + imgCache} alt="" id="profileImage"/>
            </label>
            <input
            type="file"
            id="perfil"
            name="perfil"
            accept=".jpg, .png"
            className="disabled"
            onChange={e=>{
               const img = document.querySelector("#profileImage")
               const error = document.querySelector("#errorPicture")
               let file = e.target.files[0]

               if(file  && file.size < 1000000 && (file.type === "image/jpeg" || file.type === "image/png")){
                  file = URL.createObjectURL(file)
                  img.src = file
                  error.textContent = e.target.files[0].name
               }else{
                  error.textContent = "Seleccione imágenes no mayores de 1Mb"
                  e.target.value = ""
                  img.src = `${MainUrl}view/img/default/load-img.png`
               }
            }}
            />
         </div>
         <label htmlFor="nombres">Nombre</label>
         <input type="text" required name="nombres" defaultValue={nombre} placeholder="Nombre del candidato" autoComplete="off"/>
         <label htmlFor="apellidos">Apellidos</label>
         <input type="text" required name="apellidos" defaultValue={apellidos} placeholder="Apellidos del candidato" autoComplete="off"/>
         <label htmlFor="ci">Carnet de identidad</label>
         <div className="twoSections">
            <input type="number" required name="ci" defaultValue={ci} placeholder="Ci del candidato" autoComplete="off"/>
            <select name="ci_dpto" required>
               <option value={ci_dpto} hidden>Expedido</option>
               <option value="SC">Santa Cruz</option>
               <option value="CB">Cochabamba</option>
               <option value="LP">La Paz</option>
               <option value="BN">Beni</option>
               <option value="PA">Pando</option>
               <option value="TJ">Tarija</option>
               <option value="CH">Chuquisaca</option>
               <option value="OR">Oruro</option>
               <option value="PT">Potosí</option>
            </select>
         </div>
         <label htmlFor="nacimiento">Fecha de nacimiento</label>
         <input type="date" name="nacimiento" defaultValue={nacimiento} required/>
         <label htmlFor="telf">Teléfono</label>
         <input type="number" required name="telf" defaultValue={telf} placeholder="Número de teléfono" autoComplete="off"/>
         <input type="hidden" name="nro" defaultValue={nro}/>
         <input type="hidden" name="perfil_url" defaultValue={perfil}/>
      </>
   );

   refresh = setRefreshFlag
   refreshCache = setImgCache

   setModalData({
      type: "multipartForm",
      title: "Editar",
      formId: "modificarCandidato",
      content,
      onSubmit: updateCandidate,
   });
}

//Formulario para eliminar un nuevo candidato
export const removeCandidateForm = props =>{
   const {
      nro,
      nombre,
      apellidos,
      setModalData,
      setRefreshFlag
   } = props

   const content = (
      <>
         <p>¿Estás seguro que deseas eliminar <b>{nombre} {apellidos}</b>de forma permanete?</p>
         <input type="hidden" name="nro" defaultValue={nro} />
      </>
   );

   refresh = setRefreshFlag

   setModalData({
      type: "form",
      title: "Eliminar",
      formId: "modificarCandidato",
      content,
      onSubmit: removeCandidate,
   });
}

//Para insertar un nuevo candidato
const insertCandidate = async form => {

   const formData = new FormData(form)
   const url = `${MainUrl}?show=candidato&target=insertar_candidato`
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data)
   const response = await request.json()
   refresh(1)
   return response

}

//Para modificar un candidato
const updateCandidate = async form => {

   const formData = new FormData(form)
   const url = `${MainUrl}?show=candidato&target=modificar_candidato`
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data)
   const response = await request.text()
   refresh(true)
   refreshCache(Math.random())
   return response
}

//Para eliminar un candidato
const removeCandidate = async form => {

   const formData = new FormData(form)
   const url = `${MainUrl}?show=candidato&target=eliminar_candidato`
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data)
   const response = await request.text()
   refresh(true)
   return response
}

export const showInfo = props =>{

   const {
      nombre,
      ci,
      nacimiento,
      telf,
      perfil,
      imgCache,
      setModalData
   } = props

   const content = (
      <>
         <div className="profile-photo">
            <img src={MainUrl + perfil + "?" + imgCache} alt="Perfil" />
         </div>
         <p><b>Nombre: </b>{nombre}</p>
         <p><b>Carnet de identidad: </b>{ci}</p>
         <p><b>Fecha de nacimiento: </b>{nacimiento}</p>
         <p><b>Teléfono: </b>{telf}</p>
      </>
   )

   setModalData({ //Callback
      type: "info",
      title: "Detalles",
      formId: "moreDetails",
      content,
   });

}

//Obtener lista de candidatos
export const getCandidateList = async props => {
   const { targetPag, setCandidateList } = props
   const url = `${MainUrl}?show=candidato&target=lista_candidatos`
   const body = new FormData()
   body.append('pagination', targetPag)
   const data = {
      method: 'POST',
      body: body
   }
   const request = await fetch(url, data)
   const response = await request.json()
   setCandidateList(response)
}

//Obtener candidatos
export const getCandidatePagination = async props => {
   const { setNumPages } = props;
   const url = `${MainUrl}?show=candidato&target=cantidad_candidatos`
   const request = await fetch(url)
   const response = await request.text()
   const cant = await parseInt(response)
   const stack = 5 //cantidad de items por paginación

   if( cant % stack === 0 ){
      setNumPages(cant / stack)
   }else{
      let numPag = (Math.round( cant / stack))
      stack * numPag < cant ? numPag++ : numPag = numPag + 0
      setNumPages(numPag)
   }

}
