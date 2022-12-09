import React, { Fragment, useState } from "react";
import ItemList from "./ItemList";
import moment from "moment";
import { Collapse } from "react-bootstrap";
import "./orders.css";
import * as NumUtils from "../../utils/NumberUtil";

const Order = (props) => {
  const [collapseFlag, setCollapseFlag] = useState(false);
  const [order] = useState(props.order);

  return (
    <Fragment>
      <div className="card order__card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-3">
              <div>Order Placed</div>
              <div>
                {moment(order.order_date, "DD-MM-YYYY").format("DD MMM YYYY")}
              </div>
            </div>
            <div className="col col-sm-3">
              <div>Total</div>
              <div>
                {/* <i className="fa fa-inr"></i> */}
                {NumUtils.toIndianCurrency(order.net_amount)}
              </div>
            </div>
            <div className="col col-sm-3 d-none d-sm-block">
              <div>Ship To</div>
              <div>Ravendra Singh</div>
            </div>
            <div className="col col-sm-3">
              <div>
                Order#{order.order_id}
                <div>
                  <button
                    type="button"
                    className="btn btn-link btn-sm"
                    onClick={() => setCollapseFlag(!collapseFlag)}
                    // aria-controls="example-collapse-text"
                    aria-expanded={collapseFlag}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Collapse in={collapseFlag}>
          <div>
            <ItemList items={order.items} />
          </div>
        </Collapse>
      </div>
    </Fragment>
  );
};

export default Order;
