import React from 'react'
import "./GlobalComponents.css"

interface props {
  placeholder: string,
  type: string,
  name: string,
  id: string,
  errorMessage?: string | null | undefined,
  children?: JSX.Element | JSX.Element[]
}

function FormInput({placeholder, type, name, id, errorMessage, children}: props, ref?: any) {
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
