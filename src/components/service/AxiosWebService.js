import axios from "axios";

const AxiosWebService = (BASE_URL) => {
  console.log("BASE_URL in AxiosWebService", BASE_URL);

  let client = axios.create({
    baseURL: BASE_URL,
  });

  return client;
};

export default AxiosWebService;
