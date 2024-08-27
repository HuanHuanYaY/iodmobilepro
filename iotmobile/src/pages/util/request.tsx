import axios from 'axios'

const request = axios.create({
  baseURL: 'http://8.138.25.107:8080',
  timeout: 5000,

})


export default request