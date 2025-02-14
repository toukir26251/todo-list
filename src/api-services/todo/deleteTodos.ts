import axios from "axios"

const API_BASE_URL:string = process.env.REACT_APP_API_BASE_URL || ''
const API_END_POINT:string = 'tasks'

export const DeleteTodos = async (taskId: number) => {
    try{
        const response = await axios.delete(`${API_BASE_URL}/${API_END_POINT}/${taskId}`,
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