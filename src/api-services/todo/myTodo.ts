import axios from "axios"
import { UserData } from "../../models/UserData"

const API_BASE_URL:string = process.env.REACT_APP_API_BASE_URL || ''
const API_END_POINT:string = 'tasks'

export const GetMyTodos = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/${API_END_POINT}`, {
            headers:{
                Authorization: 'Bearer '+sessionStorage.getItem('accessToken')
            }
        })
        return response.data
    }
    catch(error){

    }
}