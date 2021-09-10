import { MainUrl} from "./MainUrl"

/*
En este archivo se encuantran las funciones que generan
los formularios para crear, visuailizar, modificar y eliminar
candidatos
*/

//Para refrescar la lista de candidatos
let refresh = () => {}

export const asignCandidateForm = props => {

   const {
      nro,
      nombre,
      eventList,
      setModalData,
      refreshEventList
   } = props

   const content = (
      <> 
         <label htmlFor="fecha_final">Evento</label>
         <select
         onChange={ e=>{candidateList(e.target.value)} }
         >
         <option value={0} hidden>Seleccione un evento</option>
            {
            eventList?
            eventList.map((e, index) => (
               <option value={e.nro} key={index}>{e.evento}</option>
            ))
            : <></>
            }
         </select>
         <label htmlFor="fecha_final">Categoría</label>
         <select name="categoria" id="formSelectCatList">
            <option value={0} hidden>Seleccione una categoría</option>
         </select>
         <input type="hidden" name="candidato" defaultValue={nro} />
      </>
   )

   refresh = refreshEventList

   setModalData({
      type: "form",
      title: nombre,
      formId: "asignarCandidato",
      content,
      onSubmit: asignCandidate
   })
   
}

export const removeCandidateForm = props => {
   const {
      nro,
      category,
      nombre,
      setModalData,
      refreshCanddiateList
   } = props

   const content = 
   <>
   <p>¿Desea desvincular <b>{nombre}</b>de esta lista?</p>
   <input type="hidden" name="candidato" defaultValue={nro} />
   <input type="hidden" name="categoria" defaultValue={category} />
   </>

   refresh = refreshCanddiateList

   setModalData({
      type: "form",
      title: "Desvincular",
      formId: "asignarCandidato",
      content,
      onSubmit: removeCandidateList
   })
}

export const asignCandidate = async (form) => {
   const formData = new FormData(form)
   const url = `${MainUrl}?show=candidato_categoria&target=asignar_candidato`
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data)
   const response = await request.text()
   refresh()
   return response
}

//Refrescar el select de la ventana modal
const candidateList = async (target) => {
   const body = new FormData()
      body.append("nro_evento", target)
      const url = `${MainUrl}?show=categoria&target=filtrar_categoria`
      const data = {
         method: "POST",
         body
      }
      const request = await fetch(url, data)
      const response = await request.json()

      if(response){
         const formSelectCatList = document.querySelector("#formSelectCatList")
         formSelectCatList.innerHTML = "<option value='0' hidden>Seleccione una categoría</option>";
         response.forEach(e =>{
            formSelectCatList.innerHTML += `
            <option value="${e.nro}" >${e.categoria}</option>
            `;
         })
      }
}

//Eliminar el select de la ventana modal
const removeCandidateList = async (form) => {
   const body = new FormData(form)
      const url = `${MainUrl}?show=candidato_categoria&target=desvincular_candidato`
      const data = {
         method: "POST",
         body
      }
      const request = await fetch(url, data)
      const response = await request.json()
      refresh()
      return response
}