import React from 'react'
import { Todo } from '../../models/Todo'
import SingleTodo from '../Singletodo'

interface Props{
    todoList: Todo[],
    setTodoList : React.Dispatch<React.SetStateAction<Todo[]>>
    markDoneOrUndone :(id: number, action: boolean) => void
    updatingTask: number,
    setUpdatingTask: React.Dispatch<React.SetStateAction<number>>
    taskDeleted : (id: number) => void
}

const Todolist = ({todoList, setTodoList, markDoneOrUndone, updatingTask, setUpdatingTask, taskDeleted}: Props) => {
  return (
    <div className=''>
      {
        todoList.map(todo=>(
            <SingleTodo todo={todo} key={todo.id} markDoneOrUndone={markDoneOrUndone} updatingTask={updatingTask} setUpdatingTask={setUpdatingTask} taskDeleted={taskDeleted}/>
        ))
      }
    </div>
  )
}

export default Todolist
