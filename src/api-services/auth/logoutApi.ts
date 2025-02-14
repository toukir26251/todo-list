import axios from "axios";

const API_BASE_URL:string = process.env.REACT_APP_API_BASE_URL || ''
const API_END_POINT:string = 'logout'

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${API_END_POINT}`, {}, {
            headers:{
                Authorization: 'Bearer '+sessionStorage.getItem('accessToken')
            }
        });

        return response.data;
      } catch (error) {
        console.error('Logout failed', error);
        throw error;
      }
}