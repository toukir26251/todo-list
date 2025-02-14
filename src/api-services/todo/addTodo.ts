import axios from "axios"

const API_BASE_URL:string = process.env.REACT_APP_API_BASE_URL || ''
const API_END_POINT:string = 'tasks'

export const AddTodos = async (todo: string, userId: number | undefined) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/${API_END_POINT}`, {
            title: todo,
            is_completed: false,
        },
        {
            headers:{
                Authorization: 'Bearer '+sessionStorage.getItem('accessToken')
            }
        }
        )
        return response.data
    }
    catch(error){

    }
}