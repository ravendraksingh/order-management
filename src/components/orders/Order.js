import React, { Fragment, useState } from "react";
import ItemList from "./ItemList";
import moment from "moment";
import "./order.css";
import * as NumUtils from "../../utils/NumberUtil";

const Order = (props) => {
  const [order] = useState(props.order);
//   console.log("order", props.order);

  return (
    <Fragment>
      <div className="card order__card">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-3 d-none d-sm-block">
              <div>
                Order Placed:
                {moment(order.order_date, "DD-MM-YYYY").format("DD MMM YYYY")}
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div>Total: {NumUtils.toIndianCurrency(order.net_amount)}</div>
            </div>
            <div className="col-sm-3 d-none d-sm-block">
              <div>Ship To: Ravendra Singh</div>
            </div>
            <div className="col-6 col-sm-3">
              <div>
                Order#{order.order_id}
                {/* <div>
                  <button
                    type="button"
                    className="btn btn-link btn-sm"
                    onClick={() => setCollapseFlag(!collapseFlag)}
                    aria-expanded={collapseFlag}
                  >
                    Details
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* <Collapse in={collapseFlag}> */}
        <div>
          <ItemList
            items={order.items}
            orderDate={moment(order.order_date, "DD-MM-YYYY").format(
              "DD MMM YYYY"
            )}
          />
        </div>
        {/* </Collapse> */}
      </div>
    </Fragment>
  );
};

export default Order;
