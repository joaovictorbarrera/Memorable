import React from 'react'
import "./GlobalComponents.css"

function FormInput({placeholder, type, name, id, errorMessage, children}, ref) {
  return (
    <div className='input-wrapper'>
    <input ref={ref} className="auth-input" 
    placeholder={placeholder} 
    type={type}
    name={name}
    id={id} required />
    <p className='error-message'>{errorMessage}</p>
    {children}
  </div>
  )
}

export default React.forwardRef(FormInput)