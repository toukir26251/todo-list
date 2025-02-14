import React, { useState } from 'react'
import { Todo } from '../models/Todo'
import { MdClose, MdDone, MdEdit } from 'react-icons/md'
import Notdonebtn from './common/Notdonebtn'
import Donebtn from './common/Donebtn'
import Deletebtn from './common/Deletebtn'
import Editbtn from './common/Editbtn'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import Textinput from './common/Textinput'
import EditSubmitbtn from './common/EditSubmitbtn'
import { EditTodo } from '../api-services/todo/editTodo'
import { DeleteTodos } from '../api-services/todo/deleteTodos'

interface Props{
    todo: Todo
    markDoneOrUndone :(id: number, action: boolean) => void
    updatingTask: number,
    setUpdatingTask: React.Dispatch<React.SetStateAction<number>>
    taskDeleted : (id: number) => void
}

const SingleTodo = ({todo, markDoneOrUndone, updatingTask, setUpdatingTask, taskDeleted}: Props) => {

  const [taskEdit, setTaskEdit] = useState<number>(0)

  const [taskTitle, setTaskTitle] = useState<string>(todo.title)

  const clickEditBtn = (id: number) => {
    setTaskEdit(id)
  }

  const submitEdit = (id: number): void => {
          setUpdatingTask(id)
          const editTodo = async (id: number) => {
              try{   
                  let response = await EditTodo(taskTitle, todo.isDone, id) 
                  todo.title = taskTitle
                  setUpdatingTask(0)
                  setTaskEdit(0)
              }
              catch(error){
                  setUpdatingTask(0)
              }
          }
          editTodo(id)
      }

  

  const deleteTask = (id: number): void => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }
        setUpdatingTask(id)
        const deleteTodo = async (id: number) => {
            try{   
                let response = await DeleteTodos(id) 
                setUpdatingTask(0)
                taskDeleted(id)
            }
            catch(error){
                setUpdatingTask(0)
            }
        }
        deleteTodo(id)
    }

  return (
    <div className='mb-2'>
      <Card>
        <Card.Body>
          <Row>
          <Col md='8'>
          {
            (taskEdit !== 0 && taskEdit === todo.id) ?
            <Textinput label='' state={taskTitle} setState={setTaskTitle} /> :
            <h5>{todo.title}</h5> 
          }
            <Badge>{todo.taskId}</Badge>
          </Col>
          <Col md='4'>
            <div className='d-flex justify-content-end gap-1'>
              {
                todo.isDone ? (
                    <Notdonebtn onClick={(): void => markDoneOrUndone(todo.id, false)} />
                ) : (
                    <>
                    <Donebtn onClick={(): void => markDoneOrUndone(todo.id, true)} />
                      {
                        (taskEdit !== 0 && taskEdit === todo.id) ?
                        <EditSubmitbtn onClick={(): void => submitEdit(todo.id)}/> :
                        <Editbtn onClick={(): void => clickEditBtn(todo.id)}/>
                      }
                    </>
                )
              }
              <Deletebtn onClick={(): void => deleteTask(todo.id)}/>
            </div>
          </Col>
          {
            (updatingTask == todo.id) ?
            <Col md='12'>
              <div className="loader-line"></div>
            </Col>

            :

            ''
          }
        </Row>
        </Card.Body>
      </Card>
      
    </div>
  )
}

export default SingleTodo
