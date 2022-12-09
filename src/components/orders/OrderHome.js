import React, { Fragment, useContext, useEffect, useState } from "react";
import OrderList from "./OrderList";
import AuthContext from "../../context/AuthContext";
import UserOrderService from "../service/UserOrderService";

const OrderHome = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  
  useEffect(() => {
    const email = sessionStorage.getItem("ecomuser")
      ? JSON.parse(sessionStorage.getItem("ecomuser")).email
      : "";
    console.log(email);

    UserOrderService.fetchAllOrders(email)
      .then((response) => {
        console.log("in OrderHome useEffect onload", response.data);
        let data = response.data;
        console.log(data);
        setOrders(data);
        console.log(orders);
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
    <Fragment>
      <h3>Your Orders</h3>{errorMessage}
      {errorMessage && <p>{errorMessage}</p>}
      {!errorMessage && <OrderList orders={orders} />}
    </Fragment>
  );
};

export default OrderHome;
