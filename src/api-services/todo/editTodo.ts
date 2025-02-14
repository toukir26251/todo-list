import axios from "axios"

const API_BASE_URL:string = process.env.REACT_APP_API_BASE_URL || ''
const API_END_POINT:string = 'tasks'

export const EditTodo = async (title: string, is_completed: boolean, taskId: number | undefined) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/${API_END_POINT}/${taskId}`, {
            title,
            is_completed
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