import React from 'react'
import ReactDOM from 'react-dom'
import "./GlobalComponents.css"

function Modal({setOpen, children}) {
  return (
    ReactDOM.createPortal(
    <div className='modal-overlay' onClick={() => setOpen(false)}>
        <div className='modal-card' onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>, 
    document.getElementById("modal"))
  )
}

export default Modal