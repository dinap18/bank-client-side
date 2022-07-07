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

const loan = async (loanDetails) => {
    const {data} = await Server.post('loan', loanDetails)
    return data
}
const transfer = async (transferDetails) => {
    const {data} = await Server.post('transfer', transferDetails)
    return data
}

const getUser = async (token, id) => {
    const {data} = await Server.get(`user/${id}`, {
        headers: {'Authorization': token}
    })
    return data
}

const getUserById = async (id) => {
    const {data} = await Server.get(`user/${id}`)
    return data
}

const updateUser = async (userDetails) => {
    const {data} = await Server.put(`user/${userDetails._id}`, userDetails)
    return data
}


const API = {
     signup, login, getUser, loan, transfer, getUserById, updateUser
}

export default API