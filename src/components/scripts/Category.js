import { MainUrl } from "./MainUrl"

/*
En este archivo se encuantran las funciones que generan
los formularios para crear, visuailizar, modificar y eliminar
eventos
*/

let refresh;

export const insertCategoryForm = props => {

   const {
      setModalData,
      eventList,
      setRefresh
   } = props

   const content = (
      <>
         <label htmlFor="nombre_categoria">Nombre de la categoría</label>
         <input type="text" required name="nombre_categoria" placeholder="Nombre de la categoría" autoComplete="off"/>
         <label htmlFor="nro_evento">Evento</label>
         <select name="nro_evento" id="nro_evento">
            <option value="null" hidden >Seleccionar un evento</option>
            {
               eventList.map((e, index)=>(
                  <option value={e.nro} key={index}>{e.evento}</option>
               ))
            }
         </select>
      </>
   );

   refresh = setRefresh
   
   setModalData({
      type: "form",
      title: "Agregar una Categoría",
      formId: "agregarCategoria",
      content,
      onSubmit: insertCategory
   });
}

export const updateCategoryForm = props => {

   const {
      idEvent,
      idCategory,
      category,
      eventList,
      setModalData,
      setRefresh
   } = props
   
   const content = (
      <>
         <input type="hidden" name="nro_categoria" defaultValue={idCategory}/>
         <label htmlFor="nombre_categoria">Nombre de la categoría</label>
         <input type="text" required 
         name="nombre_categoria" placeholder="Nombre de la categoría" 
         autoComplete="off" defaultValue={category}/>
         <label htmlFor="nro_evento">Evento</label>
         <select name="nro_evento" id="nro_evento">
            <option value={idEvent} hidden>Evento</option>
            {
               eventList.map((e, index)=>(
                  <option value={e.nro} key={index}>{e.evento}</option>
               ))
            }
         </select>
      </>
   );

   refresh = setRefresh
         
   setModalData({
      type: "form",
      title: "Modificar una categoría",
      formId: "modificarCategoria",
      content,
      onSubmit: updateCategory
   });
}

export const removeCategoryForm = props => {

   const {
      idCategory,
      category,
      setModalData,
      setRefresh
   } = props
   
   const content = (
      <>
         <input defaultValue={idCategory} type="hidden" name="nro_categoria"/>
         <p>¿Estas seguro que quieres eliminar <b className="t-green">"{category}"</b> de forma permanente?</p>
      </>
   );

   refresh = setRefresh

   setModalData({
      type: "form",
      title: "Eliminar",
      formId: "eliminarCategoria",
      content,
      onSubmit: removeCategory
   });
}

export const showCategoryDetails = props => {

   const {
      nroEvent,
      category,
      eventList,
      setModalData
   } = props

   let event = 0;
   eventList.forEach(e => {
      if(parseInt(e.nro) === parseInt(nroEvent)){
         event = e.evento;
      }
   })
   
   const content = (
      <>
         <p><b>Categoría: </b>{category}</p>
         <p><b>Evento: </b>{event}</p>
      </>
   )
   setModalData({
      type: "info",
      title: "Detalles",
      formId: "category",
      content,
   });

}

const insertCategory = async form => {

   const formData = new FormData(form);
   const url = `${MainUrl}?show=categoria&target=agregar_categoria`;
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data);
   const response = await request.json();
   refresh(1)
   console.log(response);
   
}

const updateCategory = async form => {

   const formData = new FormData(form);
   const url = `${MainUrl}?show=categoria&target=modificar_categoria`;
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data);
   const response = await request.json();
   refresh(1)
   console.log(response);
   
}

const removeCategory = async form => {

   const formData = new FormData(form);
   const url = `${MainUrl}?show=categoria&target=eliminar_categoria`;
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data);
   const response = await request.json()
   refresh(1)
   console.log(response);
   
}

