import axios from "axios";

const api = axios.create({
    baseURL: "https://doitnow.onrender.com"
})

export default api