import axios from 'axios'

const Server = axios.create({
    baseURL: `http://localhost:8000/api/v1`
})

const signup = async user => {
    await Server.post('user', user)
}

const login = async (loginDetails) => {
    const {data} = await Server.post('auth', loginDetails)
    return data.access_token
}

const getUser = async (token, id) => {
    const {data} = await Server.get(`user/${id}`, {
        headers: {'Authorization': token}
    })
    return data
}



const API = {
     signup, login, getUser
}

export default API