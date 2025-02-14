import React, { useEffect, useState } from 'react'
import { Todo } from '../../models/Todo';
import { Col, Container, Row } from 'react-bootstrap';
import Taskform from '../form/Taskform';
import Todolist from '../list/Todolist';
import Navbar from '../common/Navbar';
import { setSubmitBtnLoading } from '../../redux-store/slices/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks';
import { GetMyTodos } from '../../api-services/todo/myTodo';
import { UserData } from '../../models/UserData';
import { AddTodos } from '../../api-services/todo/addTodo';
import { EditTodo } from '../../api-services/todo/editTodo';


interface Props{
    darkTheme: boolean,
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>,
    handleTheme: () => void
}

const Home = ({darkTheme, setDarkTheme, handleTheme}:Props) => {
    const dispatch = useAppDispatch()

    const [userData, setUserData] = useState<UserData | null>(()=>{
        const userDataString = localStorage.getItem('user')
        const userData: UserData | null = userDataString ? JSON.parse(userDataString) : null

        return userData
    })

    const [todo, setTodo] = useState<string>("")
    const [todoList, setTodoList] = useState<Todo[]>([])
    const [doneTodoList, setDoneTodoList] = useState<Todo[]>([])
    const [updatingTask, setUpdatingTask] = useState<number>(0)

    const handleAdd =  async (e: React.FormEvent) => {
        e.preventDefault();

        const addTodo = async (title: string) => {
            try{
                let response = await AddTodos(todo, userData?.id) 
                console.log(response);
                dispatch(setSubmitBtnLoading(false));
                return response.task 
            }
            catch(error){
                dispatch(setSubmitBtnLoading(false));
            }
        }

        if(todo){
            let task = await addTodo(todo)
            setTodoList([{id: task.id, title: task.title, isDone: false, taskId: task.task_id}, ...todoList])
            setTodo("")
        }
    }

    const fetchData = async () => {
        try{
            let todosResponse = await GetMyTodos()
            let todos = todosResponse.tasks
            const incompleteTodos = todos
                .filter((todo: {"id": number, "title": string, "is_completed": boolean, "task_id": string}) => !todo.is_completed) // Get only incomplete todos
                .map((todo: {"id": number, "title": string, "is_completed": boolean, "task_id": string}) => ({
                id: todo.id,
                title: todo.title,
                taskId: todo.task_id,
                isDone: todo.is_completed,
                })); 
                
            const completeTodos = todos
                .filter((todo: {"id": number, "title": string, "is_completed": boolean, "task_id": string}) => todo.is_completed) // Get only incomplete todos
                .map((todo: {"id": number, "title": string, "is_completed": boolean, "task_id": string}) => ({
                id: todo.id,
                title: todo.title,
                taskId: todo.task_id,
                isDone: todo.is_completed,
                })); 

            setTodoList([...todoList, ...incompleteTodos])
            setDoneTodoList([...doneTodoList, ...completeTodos])
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchData()
    }, [userData])

    const markDoneOrUndone = (id: number, action: boolean): void => {
        setUpdatingTask(id)
        const editTodo = async (id: number) => {
            try{   
                if(action){
                    let done: Todo | undefined = todoList.find(item => item.id === id)
                    if(done){
                        let response = await EditTodo(done.title, action, id) 
                        setTodoList(todoList.filter(item => item.id !== id))
                        done.isDone = action
                        setDoneTodoList([done, ...doneTodoList])
                    }
                }
                else{
                    let notDone: Todo | undefined = doneTodoList.find(item => item.id === id)
                    if(notDone){
                        let response = await EditTodo(notDone.title, action, id) 
                        setDoneTodoList(doneTodoList.filter(item => item.id !== id))
                        notDone.isDone = action
                        setTodoList([notDone, ...todoList])
                    }
                }
                setUpdatingTask(0)
            }
            catch(error){
                setUpdatingTask(0)
            }
        }
        editTodo(id)
    }

    const taskDeleted = (id: number): void => {
        let deleted: Todo | undefined = todoList.find(item => item.id === id)
        if(deleted){
            setTodoList(todoList.filter(item => item.id !== id))
        }
        if(!deleted){
            deleted = doneTodoList.find(item => item.id === id)
            setDoneTodoList(doneTodoList.filter(item => item.id !== id))
        }
    }

  return (
    <div>
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} handleTheme={handleTheme} />
        <Container className='mt-3 px-5'>
            <Taskform todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
            <Row>
                <Col md='6' className='mb-2'>
                <div className='border border-secondary rounded p-2'>
                    <h4 className='mb-3'>To Do</h4>
                    <Todolist todoList={todoList} setTodoList={setTodoList} markDoneOrUndone={markDoneOrUndone} updatingTask={updatingTask} setUpdatingTask={setUpdatingTask} taskDeleted={taskDeleted}/>
                </div>
                </Col>
                <Col md='6' className='mb-2'>
                <div className='border border-success rounded p-2'>
                    <h4 className='mb-3'>Done</h4>
                    <Todolist todoList={doneTodoList} setTodoList={setDoneTodoList} markDoneOrUndone={markDoneOrUndone} updatingTask={updatingTask} setUpdatingTask={setUpdatingTask} taskDeleted={taskDeleted}/>
                </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Home
