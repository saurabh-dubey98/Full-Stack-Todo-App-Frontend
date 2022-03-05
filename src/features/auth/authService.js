import axios from 'axios';

// Regsiter user
const register = async (userData) => {
    const response = await axios.post(process.env.REACT_APP_AUTH_API_URL, userData)
    if (response.data) {
        localStorage.setItem('todoUser', JSON.stringify(response.data))
    }
    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(process.env.REACT_APP_AUTH_API_URL + 'login', userData)
    if (response.data) {
        localStorage.setItem('todoUser', JSON.stringify(response.data))
    }
    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('todoUser')
}

const authService = {
    register,
    logout,
    login
}

export default authService