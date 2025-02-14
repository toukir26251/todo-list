import React from 'react'
import { Button } from 'react-bootstrap'
import { MdEdit } from 'react-icons/md'

interface EditbtnProps {
  onClick: () => void;
}

const Editbtn = ({onClick}: EditbtnProps) => {
  return (
    <Button variant='warning' onClick={onClick}><MdEdit /></Button>
  )
}

export default Editbtn
