import axios from "axios";
const baseurl = process.env.REACT_APP_PAYMENTSAPI_BASE_URL;

const fetchAllTxnsForEmail = (email) => {
  let apiurl = baseurl + "/users/" + email + "/txns";
  console.log(apiurl);
  
  return axios.get(apiurl, {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return {
        code: 404,
        status: "failed",
        message: "No data found!"
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
};

const UserTxnService = {
  fetchAllTxnsForEmail: fetchAllTxnsForEmail,
};

export default UserTxnService;
