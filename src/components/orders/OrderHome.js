import React, { useEffect, useState } from "react";
import UserOrderService from "../service/UserOrderService";
import "./orderhome.css";
import OrderList from "./OrderList";

const OrderHome = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const email = sessionStorage.getItem("ecomuser")
      ? JSON.parse(sessionStorage.getItem("ecomuser")).email
      : "";
    // console.log(email);

    UserOrderService.fetchAllOrders(email)
      .then((response) => {
        console.log("in OrderHome useEffect onload", response.data);
        let data = response.data;
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
        console.log("Error in OrderHome", error);
        if (error && error.response && error.response.data) {
          console.log(error.response.data);
          setErrorMessage(error.response.data.message);
        } else {
          console.log("Error in fetching orders", error);
        }
      });
  }, []);

  return (
    <div className="order__main-container">
      {errorMessage && <p>{errorMessage}</p>}
      {!errorMessage && <OrderList orders={orders} /> }
    </div>
  );
};

export default OrderHome;
