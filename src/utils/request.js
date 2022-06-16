import axios from 'axios' // 引入axios

const service = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 99999
})


export default service