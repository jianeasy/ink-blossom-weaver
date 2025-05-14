import axios from "axios";

const req = axios.create({
  baseURL: import.meta.env.VITE_APP_API,
});

req.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    return Promise.reject(new Error("Unexpected response status"));
  },
  () => {}
);
req.interceptors.request.use((requestConfig) => {
  return requestConfig;
});
export default req;
