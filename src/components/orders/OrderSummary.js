import React, { Fragment } from "react";

const OrderSummary = props => {
    return (
        <Fragment>
            <h5>Order Summary</h5>
            <div>Item's Subtotal: {props.summary.order_amount}</div>
            <div>Shipping: {props.summary.shipping_amount}</div>
            <div>Total: {props.summary.total_amount}</div>
            <div><b>Grant Total: {props.summary.grand_total_amount}</b></div>
        </Fragment>
    )
}

export default OrderSummary;