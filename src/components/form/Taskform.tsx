import React from 'react'
import Textinput from '../common/Textinput'
import Submitbtn from '../common/Submitbtn'
import { Form } from 'react-bootstrap'

interface Props{
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void
}

const Taskform = ({todo, setTodo, handleAdd}: Props) => {
  return (
    <Form onSubmit={(e) => handleAdd(e)}>
      <Textinput label='New Task' state={todo} setState={setTodo} />
      <Submitbtn name='Add Task' variant='success'/>
    </Form>
  )
}

export default Taskform
