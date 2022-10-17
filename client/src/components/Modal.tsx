import React from 'react'
import ReactDOM from 'react-dom'
import "./GlobalComponents.css"

interface props {
  setOpen: (x: boolean) => void,
  children: JSX.Element | JSX.Element[]
}

function Modal({setOpen, children}: props) {
  return (
    ReactDOM.createPortal(
    <div className='modal-overlay' onClick={() => setOpen(false)}>
        <div className='modal-card' onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>, 
    document.getElementById("modal") as HTMLElement)
  )
}

export default Modal