import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PaymentService from "../service/PaymentService";
import CryptoJS from "crypto-js";
// import { useNavigate } from "react-router-dom";

const paymenturl = process.env.REACT_APP_CRM_PAYMENT_URL;

const CheckoutModal = (props) => {
  const [show] = useState(props.show);
  const [apiResponse, setApiResponse] = useState({});

  // const navigate = useNavigate();

  const handleClose = () => {
    props.onClose();
  };
  console.log("in checkoutModal");
  console.log(props.data);

  const createOrderHandler = (data) => {
    let resJson = {};
    PaymentService.createPaymentOrder(data).then((response) => {
      if (response !== null) {
        resJson = JSON.parse(response);
        console.log(resJson);
        // let apires = {
        //   orderid: resJson.orderid,
        //   pgorderid: resJson.pgorderid,
        //   status: resJson.status,
        // };
        setApiResponse(resJson);
      }
      if (resJson.status === "created") {
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(response),
          process.env.REACT_APP_ENCRYPTION_KEY
        ).toString();
        console.log(encryptedData);
        window.location.assign(
          paymenturl + "?params=" + encodeURIComponent(encryptedData)
        );
        //navigate(paymenturl + "?params=" + encodeURIComponent(encryptedData));
      }
    });
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header closeButton>
          <Modal.Title>Proceed to Buy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Proceed to buy your product Response:
          <p>
            OrderId= {apiResponse.orderid} :: PG OrderId={" "}
            {apiResponse.pgorderid} :: Status= {apiResponse.status} :: Amount={" "}
            {apiResponse.amount}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => createOrderHandler(props.data)}
          >
            Make Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutModal;
