import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:5001/challenge-18b20/us-central1/api'  // This is gotten after running 'firebase emulator:start' in console
    // When it's time for live deployment, you'll substitute this local url with that found in the Firebase functions, something like: 
    // https://us-central1-challenge-4b2b2.cloudfunctions.net/api
})

export default instance

