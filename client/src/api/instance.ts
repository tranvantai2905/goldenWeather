import axios from "axios";

const instance = axios.create({
  // baseURL: "https://goldenweather.onrender.com/api/v1",
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'true'
},
});


export default instance;