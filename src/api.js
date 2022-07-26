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

const getTransfersTo = async (id) => {
    const {data} = await Server.get(`transfer/to/${id}`)
    return data
}
const getTransfersFrom = async (id) => {
    const {data} = await Server.get(`transfer/from/${id}`)
    return data
}
const getLoansTo = async (id) => {
    const {data} = await Server.get(`loan/to/${id}`)
    return data
}
const getLoansFrom = async (id) => {
    const {data} = await Server.get(`loan/from/${id}`)
    return data
}

const getDollarToLevCoin = async () => {
    const {data} = await Server.get(`levcoin/value/USD`)
    return data
}
const getShekelToLevCoin = async () => {
    const {data} = await Server.get(`levcoin/value/ILS`)
    return data
}

const getAccountsToApprove = async () => {
    const {data} = await Server.get(`gmail`)
    return data
}
const deleteEmail = async (emailId) => {
    const {data} = await Server.delete(`gmail/${emailId}`)
    return data
}
const deleteUser = async (id) => {
    const {data} = await Server.delete(`user/${id}`)
    return data
}
const getLoanById = async (id) => {
    const {data} = await Server.get(`loan/${id}`)
    return data
}
const payBackLoan = async (loan) => {
    const {data} = await Server.put(`loan/${loan._id}`,loan)
    return data
}

const API = {
    signup,
    login,
    getUser,
    loan,
    transfer,
    getUserById,
    updateUser,
    getTransfersTo,
    getTransfersFrom,
    getLoansTo,
    getLoansFrom,
    getDollarToLevCoin,
    getShekelToLevCoin,
    getAccountsToApprove,
    deleteEmail,
    deleteUser,
    getLoanById,
    payBackLoan,
}

export default API