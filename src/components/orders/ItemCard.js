import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./itemcard.css";

const ItemCard = (props) => {
  const item = props.item;
  console.log("item", item);
    console.log(props.orderDate);
  return (
    <div>
      <ul className="ul itemcard__product" key={item.id}>
        <li>
          <img
            src={item.image_url}
            className="itemcard__product-img"
            alt=""
          />

          <Link to={"../../ecom/products/" + item.sku}>
            <a
              href={"/ecom/products/" + item.sku}
              className="itemcard__img-desc-box"
            >
              {item.description}
            </a>
          </Link>
          {item.delivery_status === "delivered"
            ? "Delivered on, " + moment(item.delivery_date, "DD-MM-YYYY").format("DD MMM YYYY")
            : "Ordered on, " +
              props.orderDate}
        </li>
      </ul>
    </div>
  );
};

export default ItemCard;
