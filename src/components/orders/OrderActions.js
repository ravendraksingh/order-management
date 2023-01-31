import React from "react";
import "./orderactions.css";

const OrderActions = () => {
  return (
    <div className="btn-group-vertical btn-group-sm order__actions">
      <button type="button" className="btn btn-light btn-sm order__actions-button">
        Track Package
      </button>
      <button type="button" className="btn btn-light btn-sm">
        Return Item
      </button>
      <button type="button" className="btn btn-light btn-sm">
        Review Product
      </button>
    </div>
  );
};

export default OrderActions;
