import React, { useState, useEffect, useContext } from "react";
import CardInput from "./CardInput";
import "./payment.css";
import PaymentService from "../service/PaymentService";
import moment from "moment";
import AuthContext from "../../context/AuthContext";

const Payment = () => {
  // const [ccNumber, setCcNumber] = useState();
  // const [cvv, setCvv] = useState();
  // const [expiry, setExpiry] = useState();
  // const [custName, setCustName] = useState();
  const [apiData, setApiData] = useState({});
  //"2022-11-28T12:11:44+05:30"
  let dd = moment().format("YYYY-MM-DD'T'hh:mm:ssZ");
  console.log(dd);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let orderid = decodeURIComponent(queryParams.get("orderid"));
    let email = queryParams.get("email");
    let netamount = queryParams.get("netamount");
    const apidata = {
      orderId: orderid,
      email: email,
      netAmount: parseFloat(netamount),
    };
    console.log(apidata);
    setApiData(apidata);
  }, []);

  const paynowHandler = () => {
    PaymentService.createPaymentOrder(apiData);
  };

  return (
    <div className="pg__main-container">
      <div className="pg__header">PinkyPay</div>
      <p>Enter the 16-digit card number on your card</p>

      <div className="pg__items">
        <div className="pg__items-left">
          <ul>
            <li key="id_ccnumber">
              <label style={{ margin: "10px" }}>Card Number</label>
              <CardInput />

            </li>
            
            <li key="id_cvv">
              <label style={{ margin: "10px" }}>CVV Number</label>
              <input
                type="password"
                size="3"
                placeholder="cvv"
                style={{ width: "60px" }}
                value="123"
              ></input>
            </li>
            <li key="id_exp">
              <label style={{ margin: "10px" }}>Expiry</label>
              <input type="text" size="2" placeholder="MM" value="10" />/
              <input type="text" size="2" placeholder=" YY" value="25" />
            </li>
            <li key="id_name">
              <label style={{ margin: "10px" }}>Name</label>
              <input type="text" size="30" value="Ravendra Singh" />
            </li>
            <li key="id_submit">
              <button className="btn btn-primary" onClick={paynowHandler} 
              disabled={authCtx.ecomuser.isloggedin ? false : true}>
                Pay Now
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;
