import axios from "axios"

/**
 * 
 * @param {*} user 
 * @param {*} response 
 */
const registerUser = async (user, response) => {
    axios.post('http://localhost:3001/register', 
        user
    ).then(res => {
        response(res.data + ', redirecting...')
        setTimeout(() => {
            window.location.href="/"
        }, 3000)
    }).catch(err =>{ 
        console.log(err.response)
        response(err.response.data.error)
    })
} 

/**
 * 
 * @returns {user}
 */
const getProfile = async () => {
    /* Creating an axios GET request, using the authorization header to 
        verify users authentication */
    let response = await axios.get('http://localhost:3001/settings', { 
            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') 
    }}).catch(e => {
           throw new Error('no auth')
    })
    return response.data
}

/**
 * Deletes local user via POST, if appropriate local auth is sent
 * @returns {message}
 */
const userDelete = async () => {
    let response = await axios({
        method: 'POST',
        url: 'http://localhost:3001/settings/delete',
        headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}
    }).catch(err => console.log(err.response))
    return response.data
}

/**
 * Using a GET request to remove all session data from both frontend 
 * and backend
 * @returns {redirect}
 */
const userLogout = async () => {
    await axios({
        method: 'GET',
        url: 'http://localhost:3001/logout'
    })
    .then(res => {
        localStorage.removeItem('token')
        window.alert(res.data.message)
        window.location.href="/"
    })
    .catch(err => {
        console.log(err.response)
    })
}

/**
 * Retrieves local user information by GET method, used to display information
 * on /home
 * @param {Object} user 
 * @returns {user}
 */
const getLocalUser = async (user) => {
    return axios.get(`http://localhost:3001/user/${user}`)
}

/**
 * Contacts API to gather information about non-local user via GET method,
 * used to display on /:user
 * @param {Object} user 
 * @param {String} response 
 * @returns {Object} user information
 */
 const getUser = async (user, response) => {
    /* HTTP get function to user location */
    const res = await axios.get(`http://localhost:3001/user/${user}`)
    /* Catches our promise rejection, then renders it onto the page by setting response */
    .catch(err => {
        response(err.response.data.error)
        return err.response.data.error
    })
    /* If user is valid (not null) return their data */
    if(res) return res.data
}

/**
 * Gathers all of public user data via GET method, used for frontend
 * navigation around users at /users
 * @returns {Users}
 */
const getUserList = async () => {
    return axios.get(`http://localhost:3001/users`)
}

export { registerUser, getProfile, userLogout, userDelete, getLocalUser, getUser, getUserList }
