import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import UserTxnService from "../../service/UserTxnService";
import "./txnhome.css";
import TxnList from "./TxnList";
import LoadingGIF from "../../UI/LoadingGIF";

const TxnHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [txns, setTxns] = useState([]);

  useEffect(() => {
    const email = JSON.parse(sessionStorage.getItem("ecomuser")).email;
    console.log(email);
    console.log(isLoading);

    if (email !== null) {
      let response = UserTxnService.fetchAllTxnsForEmail(email);
      response
        .then((data) => {
          console.log("data", data);
          setTxns(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <Fragment>
      <h3>Your Transactions</h3>
      {/* <div>{JSON.stringify(txns)}</div> */}
      {isLoading && <LoadingGIF />
      }
      {!isLoading && txns.length === 0 && <p>No transaction found!</p>}
      {!isLoading && txns.length !== 0 && <TxnList txns={txns} />}
    </Fragment>
  );
};

export default TxnHome;
