import React from 'react'
import { Form } from 'react-bootstrap'

interface Props{
    type?: string,
    label: string,
    placeholder?: string,
    isRequired?: boolean,
    state: string,
    setState: React.Dispatch<React.SetStateAction<string>>
}

const Textinput = ({type='text', label, state, setState, placeholder='', isRequired=false}:Props) => {
  return (
    <Form.Group className="mb-3">
      {
        (label) ? <Form.Label>{label}</Form.Label> : ''
      }
      <Form.Control 
        className='' 
        type={type} 
        value={state} 
        placeholder={placeholder} 
        required={isRequired} 
        onChange={(e)=>setState(e.target.value)} 
      />
    </Form.Group>
  )
}

export default Textinput
