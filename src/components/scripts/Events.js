import { MainUrl} from "./MainUrl"

/*
En este archivo se encuantran las funciones que generan
los formularios para crear, visuailizar, modificar y eliminar
eventos
*/

export const insertEventForm = props => {

   const {
      setModalData
   } = props
   
   const content = (
      <>
         <label htmlFor="nombre_evento">Nombre del evento</label>
         <input type="text" required name="nombre_evento" placeholder="Nombre del evento" autoComplete="off"/>
         <label htmlFor="fecha_inicio">Inicio del evento</label>
         <input type="date" required name="fecha_inicio" id="fecha_inicio"/>
         <label htmlFor="fecha_elecciones">Día de las elecciones</label>
         <input type="date" required name="fecha_elecciones" id="fecha_elecciones"/>
         <label htmlFor="fecha_final">Final del evento</label>
         <input type="date" required name="fecha_final" id="fecha_final"/>
      </>
   );

   setModalData({
      type: "form",
      title: "Agregar un evento",
      formId: "agregarEvento",
      content,
      onSubmit: insertEvent
   });
}

export const updateEventForm = props => {

   const {
      idEvent,
      event,
      inicio,
      final,
      elecciones,
      setModalData
   } = props
   
   const content = (
      <>
         <input defaultValue={idEvent} type="hidden" name="nro_evento"/>
         <label htmlFor="nombre_evento">Nombre del evento</label>
         <input defaultValue={event} type="text" required name="nombre_evento" placeholder="Nombre del evento" autoComplete="off"/>
         <label htmlFor="fecha_inicio">Inicio del evento</label>
         <input defaultValue={inicio} type="date" required name="fecha_inicio" id="fecha_inicio"/>
         <label htmlFor="fecha_elecciones">Día de las elecciones</label>
         <input defaultValue={final} type="date" required name="fecha_elecciones" id="fecha_elecciones"/>
         <label htmlFor="fecha_final">Final del evento</label>
         <input defaultValue={elecciones} type="date" required name="fecha_final" id="fecha_final"/>
      </>
   );

   setModalData({
      type: "form",
      title: "Modificar un evento",
      formId: "modificarEvento",
      content,
      onSubmit: updateEvent
   });
}

export const removeEventForm = props => {

   const {
      idEvent,
      event,
      setModalData
   } = props
   
   const content = (
      <>
         <input defaultValue={idEvent} type="hidden" name="nro_evento"/>
         <p>¿Estas seguro que quieres eliminar <b className="t-green">"{event}"</b> de forma permanente?</p>
      </>
   );

   setModalData({
      type: "form",
      title: "Eliminar",
      formId: "eliminarEvento",
      content,
      onSubmit: removeEvent
   });
}

export const showEventDetails = props => {

   const {
      event,
      inicio,
      final,
      elecciones,
      setModalData
   } = props
   const content = (
      <>
         <p><b>Nombre: </b>{event}</p>
         <p><b>Inicio del evento: </b>{inicio}</p>
         <p><b>Día de las elecciones: </b>{elecciones}</p>
         <p><b>Final del evento: </b>{final}</p>
      </>
   )
   setModalData({
      type: "info",
      title: "Detalles",
      formId: "agregarEvento",
      content,
   });

}

const insertEvent = async form => {

   const formData = new FormData(form);
   const url = `${MainUrl}?show=evento&target=agregar_evento`;
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data);
   const response = await request.json();
   
   console.log(response);
   
}

const updateEvent = async form => {

   const formData = new FormData(form);
   const url = `${MainUrl}?show=evento&target=modificar_evento`;
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data);
   const response = await request.json();
   
   console.log(response);
   
}

const removeEvent = async form => {

   const formData = new FormData(form);
   const url = `${MainUrl}?show=evento&target=eliminar_evento`;
   const data = {
      method: 'POST',
      body: formData
   }
   const request = await fetch(url, data);
   const response = await request.json();
   
   console.log(response);
   
}