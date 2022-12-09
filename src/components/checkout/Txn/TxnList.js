import React from "react";
import Txn from "./Txn";

const TxnList = (props) => {
  
    console.log(props.txns);

    return (
        <div className="row">
          <div className="col">
            {props.txns.map((txn) => {
              return <Txn txn={txn} key={txn.transactionid} />;
            })}
          </div>
        </div>
    );
  };
  
  export default TxnList;