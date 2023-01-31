import AxiosWebService from "./AxiosWebService";

const BASE_URL = process.env.REACT_APP_CATALOGAPI_BASE_URL;
console.log("BASE_URL", BASE_URL);

const axiosService = AxiosWebService(BASE_URL);

const fetchAllCategories = async () => {
  let url = "/categories";
  
  return get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("fetchAllCategories error", error);
      console.log(error.status);
      throw error;
    });
};

const get = async (url) => axiosService.get(url, getHeaders() );

const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
};

const ProductService = {
    fetchAllCategories,
};

export default ProductService;
