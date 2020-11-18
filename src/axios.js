import axios from "axios"

const instance = axios.create({
    baseURL : 'http://localhost:5001/challenge-18b20/us-central1/api'  // This is gotten after running 'firebase emulator:start' in console
})

export default instance