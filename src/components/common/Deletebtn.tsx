import React from 'react'
import { Button } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'

interface EditbtnProps {
  onClick: () => void;
}

const Deletebtn = ({onClick}: EditbtnProps) => {
  return (
    <Button variant="danger" onClick={onClick}><MdDelete /></Button>
  )
}

export default Deletebtn
