import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 2000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export const instanceJWT = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 60000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  instanceJWT.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);