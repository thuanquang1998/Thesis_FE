import axios from 'axios'

export default axios.create({
    baseURL : "http://localhost:3002/"
    // baseURL : "https://bkcare.azurewebsites.net/"
})