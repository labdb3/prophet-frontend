import axios from 'axios' // 引入axios

const service = axios.create({
  // baseURL: "http://162.105.88.120:8000",
  baseURL: "http://localhost:8000",
  timeout: 99999
})


export default service