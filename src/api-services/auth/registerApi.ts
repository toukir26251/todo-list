import axios from "axios";

const API_BASE_URL:string = process.env.REACT_APP_API_BASE_URL || ''
const API_END_POINT:string = 'register'

export const registerUser = async (full_name: string, username:string, password: string, confirm_password: string
) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${API_END_POINT}`, {
            name : full_name,
            email: username,
            password: password
        });
        
        return response.data;
      } catch (error) {
        console.error('Registration failed', error);
        throw error;
      }
}