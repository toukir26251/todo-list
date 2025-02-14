import axios from "axios";

const API_BASE_URL:string = process.env.REACT_APP_API_BASE_URL || ''
const API_END_POINT:string = 'me'

export const getUserDetails = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/${API_END_POINT}`, {
            headers:{
                Authorization: 'Bearer '+sessionStorage.getItem('accessToken')
            }
        });

        return response.data;
    }
    catch(error){
        console.error('User data fetching failed', error);
        throw error;
    }
}