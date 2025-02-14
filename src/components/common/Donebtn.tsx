import React from 'react'
import { Button } from 'react-bootstrap'
import { MdDoneAll } from 'react-icons/md'

interface DonebtnProps {
  onClick: () => void;
}

const Donebtn = ({onClick}: DonebtnProps) => {
  return (
    <Button variant="info" onClick={onClick}><MdDoneAll /></Button>
  )
}

export default Donebtn
