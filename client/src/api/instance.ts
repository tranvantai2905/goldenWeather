import axios from "axios";

const instance = axios.create({
  // baseURL: "https://goldenweather.onrender.com/api/v1",
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'true'
},
});

export default instance;