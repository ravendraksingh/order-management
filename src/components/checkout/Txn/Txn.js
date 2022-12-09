import moment from "moment";
import React from "react";
import "./txn.css";
import * as NumUtils from "../../../utils/NumberUtil";

const Txn = (props) => {
  console.log(props.txn);

  const txn = props.txn;

  return (
    <div className="card tx-card">
      <div className="row">
        <div className="col">
          <ul>
            <li>Txn Id: {txn.transactionid}</li>
            <li>Txn Date: {moment(txn.transaction_date).format("DD-MM-YYYY")}</li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <li>Order Id: {txn.orderid}</li>
            <li>Amount: {NumUtils.toIndianCurrency(txn.amount)}</li>
          </ul>
        </div>
        <div className="col">
          <ul>
            <li>Email:</li>
            <li>{txn.email}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Txn;
