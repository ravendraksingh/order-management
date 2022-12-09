//import React from "react";
//import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import axios from "axios";
import moment from "moment";

const REQ_BODY = {
  amount: "",
  currency: "INR",
  customer: {
    first_name: "John",
    last_name: "Doe",
    mobile: "9800000000",
    mobile_alt: "9800000000",
    email: "john.doe@somedomain.com",
    email_alt: "john.doe@somedomain.com",
  },
  device: {
    init_channel: "internet",
    ip: "124.124.1.1",
    mac: "11-AC-58-21-1B-AA",
    imei: "990000112233445",
    user_agent:
      "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0",
    accept_header: "text/html",
    fingerprintid: "61b12c18b5d0cf901be34a23ca64bb19",
  },
  entity: "order",
  itemcode: "direct",
  mercid: "test",
  //order_date: "2022-11-28T12:11:44+05:30",
  orderid: "",
  payment_categories: ["credit_card", "debit_card", "netbanking"],
  ru: "/ecom/merchantresponse",
  settlement_lob: "auto",
  email: "",
};

const paymenturl = process.env.REACT_APP_CRM_PAYMENT_URL;
const orderapiurl = process.env.REACT_APP_PAYMENTSAPI_ORDER_URL;

const createOrder = async (data) => {
  console.log("in CheckoutService: createOrder");
  console.log(data);
  let errorMessage = "";
  try {
    //const uuid = uuidv4();
    let apiData = {
      ...REQ_BODY,
      amount: parseFloat(data.netAmount),
      amount_due: parseFloat(data.netAmount),
      amount_paid: parseFloat(data.netAmount),
      orderid: data.orderId,
      order_date: moment().format("YYYY-MM-DDThh:mm:ssZ"),
      email: data.email,
    };
    //console.log(apiData);
    const response = await axios({
      method: "post",
      url: orderapiurl,
      data: apiData,
    });
    //console.log(response);
    if (response.status === 200) {
      //console.log(response.data);
      let newData = {
        ...response.data,
        email: data.email,
      };
      console.log(newData);
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(newData),
        process.env.REACT_APP_ENCRYPTION_KEY
      ).toString();

      window.location.assign(
        paymenturl + "?params=" + encodeURIComponent(encryptedData)
      );
    }
  } catch (err) {
    if (err.respone) {
      console.log(err.respone);
    } else if (err.request) {
      console.log(err.request);
      errorMessage = JSON.parse(err.request.response).message;
    } else {
      console.log("Error: ", err.message);
    }
  }
};

const PaymentService = {
  createPaymentOrder: createOrder,
};

export default PaymentService;
