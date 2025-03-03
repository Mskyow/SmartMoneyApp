import axios from "axios";

export const instance = axios.create({
    baseURL: "https://musiify.site/api/",
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });