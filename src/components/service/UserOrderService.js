import React from "react";
import AxiosWebService from "./AxiosWebService";

const BASE_URL = process.env.REACT_APP_ORDERAPI_BASE_URL;
console.log("BASE_URL", BASE_URL);
// const fetchAllOrdersForEmail = (email) => {
//   let apiurl = baseurl + "/users/" + email + "/orders";

//   return fetch(apiurl, {
//     method: "get",
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//   .then((response) => {
//     console.log(response);
//     if (!response.ok) {
//       throw Error(response.status);
//     }
//     return response;
//   })
//   .catch((err) => {
//     console.log(err);
//     return [];
//   })
// };

const axiosService = AxiosWebService(BASE_URL);

const fetchAllOrders = async (email) => {
  let url = "/users/" + email + "/orders";
  
  return get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("fetchAllOrders error", error);
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

const UserOrderService = {
  fetchAllOrders,
};

export default UserOrderService;
