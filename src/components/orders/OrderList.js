import React, { Fragment, useState } from "react";
import Order from "./Order";
import "./OrderList.css";

const OrderList = (props) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-sm-9">
          {props.orders.map((or) => {
            return <Order order={or} key={"order_" + or.order_id} />;
          })}
        </div>
        <div className="col-12 col-sm-3 order__recomm">
          <h3>Recommendation</h3>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
