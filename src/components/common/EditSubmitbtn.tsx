import React from 'react'
import { Button } from 'react-bootstrap'
import { MdDone } from 'react-icons/md'

interface EditbtnProps {
  onClick: () => void;
}

const EditSubmitbtn = ({onClick}: EditbtnProps) => {
  return (
    <Button variant='warning' onClick={onClick}><MdDone /></Button>
  )
}

export default EditSubmitbtn
