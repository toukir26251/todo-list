import React from 'react'
import { Button } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'

interface NotDonebtnProps {
  onClick: () => void; // Define the onClick prop
}

const Notdonebtn = ({onClick}: NotDonebtnProps) => {
  return (
    <Button variant='danger' onClick={onClick}><MdClose /></Button>
  )
}

export default Notdonebtn
