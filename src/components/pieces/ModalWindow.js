import React from 'react'
import '../styles/pieces/modalWindow.css';

const buildForm = props => {

  const {
    type = "form",
    formId = "modalId",
    content = {},
    modalClose,
    onSubmit = ()=>{}
  } = props;

  const typeContent = {
    form: 
      <form 
        action="#" 
        className="modal-form"
        method="POST"
        id={formId} 
        onSubmit={e=>{
          e.preventDefault()
          onSubmit(e.target)
          modalClose()
        }}
      >
        { content }
        <div className="buttons">
          <input type="submit" value="Aceptar" className="btn-accept"/>
          <input 
            type="submit" 
            value="Cancelar" 
            className="btn-cancel"
            onClick={() => {
              modalClose()
            }}
          />
        </div>
      </form>
    , 
    info: 
      <>
        { content }
        <div className="buttons">
          <input 
            type="submit" 
            value="Aceptar" 
            className="btn-accept"
            onClick={() => {
              modalClose()
            }}
          />
        </div>
      </>
  }

  return typeContent[type];
  
}

const ModalWindow = (props) => {

  const {
    title = "Formulario vacío",
    modalClose
  } = props
  
  return (
    <div 
      className="modal-container"
      onClick={e => {
        if(e.target.classList.contains("modal-container")){
          e.preventDefault();
          modalClose();
        }
      }}
    >
      <div className="content-box">
        <p className="modal-title">{title}</p>
        {
          buildForm(props)
        }
      </div>
    </div>
  )
}

export default ModalWindow
