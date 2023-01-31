import React from "react";
import Order from "./Order";
import "./OrderList.css";

const OrderList = (props) => {
  const orders = props.orders;
  return (
    <ul className="order__list mx-auto">
      {orders.map((order) => (
        <Order order={order} />
      ))}
    </ul>
  );
};

export default OrderList;
