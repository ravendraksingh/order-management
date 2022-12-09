import axios from "axios";

const AxiosWebService = (BASE_URL) => {
  console.log("BASE_URL in AxiosWebService", BASE_URL);

  let client = axios.create({
    baseURL: BASE_URL,
  });
  
  const get = (url, axiosConfig) => {
    return client.get(url, axiosConfig);
  };
  
  const post = (url, body, config) => {
    return client.post(url, body, config);
  };  

  return client;
};

export default AxiosWebService;
