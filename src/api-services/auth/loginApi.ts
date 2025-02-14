import axios from "axios";

const API_BASE_URL:string = process.env.REACT_APP_API_BASE_URL || ''
const API_END_POINT:string = 'login'

export const loginUser = async (username:string, password: string
) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${API_END_POINT}`, {
            email: username,
            password: password
        });
        const accessToken: string = response.data.access_token
        sessionStorage.setItem("accessToken", accessToken)

        const {id, email, name} = response.data.user

        localStorage.setItem(
          "user",
          JSON.stringify({ id, email, name })
        );

        return response.data;
      } catch (error) {
        console.error('Login failed', error);
        throw error;
      }
}