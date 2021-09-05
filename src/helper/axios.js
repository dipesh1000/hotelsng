import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;
console.log(baseURL)
let headers = {
    'method': 'post',
    'Content-Type': 'application/json', 
};

if(localStorage.token){
    headers.Authorization = `Bearer + ${localStorage.token}`
}

const axiosInstance = axios.create({
    baseURL : baseURL,
    headers
})

export default axiosInstance