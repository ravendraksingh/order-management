import React, {Fragment, useState } from "react";
import AlsoBought from "./AlsoBought";
import ItemList from "./ItemList";
import OrderSummary from "./OrderSummary";

const OrderDetails = (props) => {
  const [order, setOrder] = useState(props.order);
  //const [orderSummay, setOrderSummary] = useState();
  let ordersummary = {};
  let orderItem = {};

  if (order != null) {
    ordersummary = {
      order_amount: order.order_amount,
      shipping_amount: "0.0",
      total_amount: order.order_amount,
      grand_total_amount: order.order_amount,
    };

    orderItem = {
        name : order.items[0].name,
        quantity: order.items[0].quantity,
        unit_price: order.items[0].unit_price
    }

  }

  return (
    <Fragment>
      <label htmlFor="orderedOn">
        Ordered on {order.order_date} | Order# {order.order_id}
      </label>
      <div className="card-group"> 
      <div className="card">
        <div className="row">
          <div className="col-sm-4">
            <h5>Shipping Address</h5>
            <div>Shippinh line1</div>
            <div>Shippinh line2</div>
            <div>Shippinh line3</div>
          </div>
          <div className="col-sm-4">
            <h5>Payment Method</h5>
            <div>{order.payment_status}</div>
            <div>Shippinh line2</div>
            <div>Shippinh line3</div>
          </div>
          <div className="col-sm-4">
            <OrderSummary summary={ordersummary} />
          </div>
        </div>
        </div>
      </div>
      <ItemList items={order.items}/>
    </Fragment>
  );
};

export default OrderDetails;
