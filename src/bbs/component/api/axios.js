import axios from "axios";
const api = axios.create({
    // json-server url
    // baseURL: "http://localhost:8000/",
    // spring server url
    baseURL: "http://localhost:8001/",
})
export default api ;