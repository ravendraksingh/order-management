import axios from "axios";
import React, { useState } from "react";
import "./checkout.css";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const REQ_BODY = {
  amount: 100,
  amount_due: 100,
  amount_paid: 0,
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
  order_date: "2022-11-28T12:11:44+05:30",
  orderid: "ord_83vksu3",
  payment_categories: ["credit_card", "debit_card", "netbanking"],
  ru: "/ecom/merchantresponse",
  settlement_lob: "auto",
};

const paymenturl = process.env.REACT_APP_CRM_PAYMENT_URL;
const orderapiurl = process.env.REACT_APP_PAYMENTSAPI_ORDER_URL;

const Checkout = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [inputOrderId, setInputOrderId] = useState();

  let errorMessage = "";
  let apiData = REQ_BODY;

  const createOrderHandler = async () => {
    try {
      const uuid = uuidv4();
      let amt = Math.round(Math.random() * 100);
      //console.log("uuid", uuid);
      apiData = {
        ...apiData,
        amount: amt,
        amount_due: amt,
        orderid: uuid,
      };
      const response = await axios({
        method: "post",
        url: orderapiurl,
        data: apiData,
      });
      //console.log(response);
      if (response.status === 200) {
        setData(response.data);
        //console.log(response.data);
        //setTimeout(() => {
          const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(response.data), process.env.REACT_APP_ENCRYPTION_KEY).toString();
          console.log(encryptedData);
          //const doodle = "U2FsdGVkX1/wt5ANgSC02xWCx8M1KXwFYD1XhlYbfOt8shg3jhNnE9C1fIVDNiBjEmoxtSRsU6Rv2oc8jAXWGkm8IToo8jXN64hU0pcWm4A1bTrhCYl4JtiNm/c4yCTd5YlsIA0cBbQUESDOxZom3ih7d9BE1sQg+VU5MbgrTS2Gu1rhn/J1KaU1tJPFXalqW76mbqSj4Rie7R7D/36r00OyEE4YOdv8BNx7cJnLqeIJexYqCSuz+YFoC3xXU5IT+2k9YUwh2e1urMaNT+uKAIUhKJalSLnqs3MJyctmHqCkZQsf4ho9oEZfhb0xHM8o6mEA7d931bDuiVaWxVmleCMzv+ylN05lOloRyaOHP/dc+BDZtMqk061k2TddCRrZQ8hJbBB5VlSAac4nuv/MgF5S7AtdvDkUrDfnHVZKjVxIZrV50ZufxMk5x9d5daCOUw45Rpqfeflq4U56Gni5Qa7BLNTDpLu94nDu2p/frts2VMeJ80l8j8VQbfXcxCxMKCJbUcF9QU4m0zYwOB7vDPaRA8Jd92NR7D9FkYazQcUzHT2wF5tMKDfNY36Ngswl21DOZhba8wuQ0Ku6zbTaxt+1crJh7UrrLJWthO6PoTR+atrUJREiL46L8eDq9AYUzUwUhprvxCi297YG8YXmu5tRWs1qKF+f2NymbP7FDVM9zAPTWWVFJy/AsE6x91H2aWT3XZrL5k0jEaJjIvPDXnwTb0PUxCCjrWi7h9MERlc8CV+GQs51BUaiaWHlch62no4aXmsxEHaxq5qXgsga3s0Vx8XS5rFWUTUAE53bSX9w2VPReg577FCLX6HygnxrF8UATs2gLN7dc7AG6AO/YHHUCLMkyPJg/CwzkK4G4OU0w0nhvBG1oXPqjfaaDJ/DbTUH/Jd+oEujQYJKRjs3P6WJKDz7zh6v/DSxEL73TVdFxG/UPjf/EnE5SLDkcbR4r9Hd+7ZIpMkc0yEHUgnAEkNbIn3szLS3qcChG9+w+lWjUdvTJi4hpM5MIvbMIJYyUg+hkOuEt6It5MZD5W1OynIHl2YiVx0baWUB8MSgVUPpyz8eYzCEYjgM6m2a+f24q0jyjOglCJOhfVrZJpaWJA==";
          // let bytes = CryptoJS.AES.decrypt(encryptedData, process.env.REACT_APP_ENCRYPTION_KEY);
          // const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
          // console.log(decryptedData);
          window.location.assign(paymenturl+'?params='+encodeURIComponent(encryptedData));
        //}, 4000);
      
      }
    } catch (err) {
      if (err.respone) {
        console.log(err.respone);
        setError(JSON.parse(err.respone.data).message);
      } else if (err.request) {
        console.log(err.request);
        errorMessage = JSON.parse(err.request.response).message;
        setError(errorMessage);
      } else {
        console.log("Error: ", err.message);
      }
    }
  };

  const orderIdInputHandler = (event) => {
    setInputOrderId(event.target.value);
    console.log("inputOrderId", inputOrderId);
  };

  const fetchOrderHandler = async () => {
    console.log("in fetchOrder");
    try {
        const response = await axios({
          method: "GET",
          url: orderapiurl + "/" + inputOrderId,
          data: apiData,
        });
        //console.log(response);
        if (response.status === 200) {
          setData(response.data);
          //console.log(response.data);
        }
      } catch (err) {
        if (err.respone) {
          console.log(err.respone);
          setError(JSON.parse(err.respone.data).message);
        } else if (err.request) {
          console.log(err.request);
          errorMessage = JSON.parse(err.request.response).message;
          setError(errorMessage);
        } else {
          console.log("Error: ", err.message);
        }
      }
  };

  return (
    <div className="container checkout-container">
      <h3>Checkout Page</h3>
      {error && <p className="app__error-text">Error occurred: {error}</p>}
      <div>
        <button className="btn btn-primary" onClick={createOrderHandler}>
          Create Order
        </button>
      </div>
      <div>
        <input type="text" id="orderId" onChange={orderIdInputHandler} />
        <button className="btn btn-primary" onClick={fetchOrderHandler}>
          Fetch Order
        </button>
      </div>
      <div>
        <p>PG OrderId={data.pgorderid} :: Amount={data.amount} :: Next step={data.next_step}</p>
        <p>Redirect to:<a href={paymenturl+'?params='+JSON.stringify(data)}>Click to Pay</a></p>
      </div>
    </div>
  );
};

export default Checkout;
