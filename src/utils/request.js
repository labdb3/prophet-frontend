import axios from 'axios' // 引入axios

const service = axios.create({
  // baseURL: "http://162.105.88.120:8000",
  baseURL: "http://localhost:8000",
  timeout: 1000*60*24
})


export default service