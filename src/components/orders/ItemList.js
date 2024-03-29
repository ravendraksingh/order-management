import React, { Fragment } from "react";
//import image1 from "../../images/1.jpeg";
import "./ItemList.css";
import "../products/ProductList.css";
import ItemCard from "./ItemCard";
import OrderActions from "./OrderActions";

const ItemList = (props) => {
  //console.log(props);
  const data = props.items;

  return (
    <Fragment>
      <ul className="order__items">
        {data.map((item, index) => {
          return (
            <Fragment key={"frgmt_" + index}>
              <div className="row order__item-list">
                <div className="col-sm-9 order__item-list-left">
                  <ItemCard item={item} orderDate={props.orderDate} />
                </div>
                <div className="col-sm-3 order__item-list-right">
                  <OrderActions />
                </div>
              </div>

              {/* <div className="row order__item">
              <div className="col-12 col-md-4 col-sm-4">
                <div style={{ textAlign: "left" }}>
                  <img
                    className="img-thumbnail mx-auto"
                    src={item.image_url}
                    alt="img"
                    style={{ border: 0, height: "100px", width: "100px" }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-5 col-sm-5">
                <div className="product-card-text">
                  <a href={"/ecom/products/" + item.sku}>{item.name}</a>
                </div>
                <div>Quantity: {item.quantity}</div>
                <div>
                  Unit Price: {NumUtils.toIndianCurrency(item.unit_price)}
                </div>
              </div>

              <div
                id="item-button-group"
                className="col col-md-3 col-sm-3 d-none d-sm-block"
                style={{ textAlign: "right" }}
              >
                <div className="btn-group-vertical btn-group-sm">
                  <button type="button" className="btn btn-light btn-sm">
                    Track Package
                  </button>
                  <button type="button" className="btn btn-light btn-sm">
                    Return Item
                  </button>
                  <button type="button" className="btn btn-light btn-sm">
                    Review Product
                  </button>
                </div>
              </div>
            </div> */}
            </Fragment>
          );
        })}
      </ul>
    </Fragment>
  );
};

export default ItemList;
