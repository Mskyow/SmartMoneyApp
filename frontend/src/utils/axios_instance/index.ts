import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 20000,
    headers: {'X-Custom-Header': 'foobar'}
  });