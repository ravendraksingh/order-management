import React, { useContext, useState } from "react";
import "./cart.css";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";
import * as NumberUtil from "../../utils/NumberUtil";
import CheckoutModal from "../checkout/CheckoutModal";
import OrderService from "../service/OrderService";
import moment from "moment";
import { useNavigate } from "react-router-dom";
//import Payment from "../checkout/Payment";

const EcomCart = (props) => {
  // console.log("Entering into EcomCart.js");
  const authCtx = useContext(AuthContext);
  // console.log("authcontext", authCtx);
  const cartCtx = useContext(CartContext);
  // console.log(cartCtx);
  const [checkoutmodal, setCheckoutmodal] = useState(false);

  const navigate = useNavigate();
  const deleteProductFromCart = (id) => {
    cartCtx.onDeleteProduct(id);
  };

  const qtyChangeHandler = (productid, event) => {
    // console.log("qtyChangeHandler is clicked", productid, event.target.value);
    cartCtx.onUpdateQty(productid, event.target.value);
  };

  const proceedToBuyHandler = () => {
    console.log("proceedToBuy clicked");
    //setCheckoutmodal(true);
    createOrder().then((response) => {
      if (response.order_status === "created") {
        console.log(response);
        let paymentUrl =
          "/ecom/payment?orderid=" +
          response.order_id +
          "&email=" +
          response.email +
          "&netamount=" +
          response.net_amount;
        paymentUrl = encodeURI(paymentUrl);
        // console.log(paymentUrl);
        navigate(paymentUrl);
      }
    });
  };

  const createOrder = () => {
    const payload = prepareCreateOrderPayload();
    console.log("payload", payload);
    return OrderService.createOrder(payload);
  };

  const prepareCreateOrderPayload = () => {
    let itemarray = [];
    let item = "";
    for (let cartitem of cartCtx.cart) {
      item = {
        sku: cartitem.sku,
        name: cartitem.name,
        price: cartitem.price_info.retail,
        mrp: cartitem.price_info.mrp,
        discount: cartitem.price_info.discount,
        quantity: cartitem.quantity,
        image_url: cartitem.images.default,
        description: cartitem.description,
      };
      itemarray = [...itemarray, item];
    }
    // let today = new Date();
    // order_date = today.getDate + "-" + parseInt(today.getMonth+1) + "-" + today.getFullYear;
    let payload = {
      email: authCtx.ecomuser.email,
      net_amount: cartCtx.cartInfo.netAmount,
      total_mrp: cartCtx.cartInfo.totalMRP,
      total_saving: cartCtx.cartInfo.totalSaving,
      total_quantity: cartCtx.cartInfo.totalQty,
      // order_date: "06-12-2022",
      order_date: moment().format("DD-MM-YYYY"),
      items: itemarray,
    };
    return payload;
  };

  const checkoutmodalCloseHandler = () => {
    setCheckoutmodal(false);
  };

  return (
    <div className="container cart-main-container">
      <div className="col-12 col col-md-8 cart-main-container-left">
        <h3>Shopping Cart</h3>
        {cartCtx?.cartInfo?.totalQty === 0 && (
          <p>
            Cart is empty. Add products from{" "}
            <Link to="../../ecom/products/M30I20983"> product</Link> page!
          </p>
        )}
        {cartCtx.cart.map((cp, index) => (
          <ul className="ul cart-product" key={cp.id}>
            <li>
              <Image
                src={cp.images.default}
                className="cart-product-img"
                alt="product-image"
              ></Image>

              <Link to={"../../ecom/products/" + cp.sku}>
                <p className="cart-product-img-desc-box">{cp.description}</p>
              </Link>
            </li>

            <li>
              M.R.P.:
              <span className="price-mrp">
                {NumberUtil.toIndianCurrency(cp.price_info.mrp)}
              </span>
              Price: {NumberUtil.toIndianCurrency(cp.price_info.retail)}
            </li>
            <li>
              Qty:
              <select
                className="mx-2 my-2"
                value={cp.quantity}
                onChange={(e) => qtyChangeHandler(cp.id, e)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              |
              <button
                className="btn btn-link btn-sm"
                id={cp.id + "_" + index}
                onClick={() => deleteProductFromCart(cp.id)}
              >
                Delete
              </button>{" "}
              |<button className="btn btn-link btn-sm">Save for Later</button>
            </li>
            <hr className="hline" />
          </ul>
        ))}
      </div>

      <div className="col-12 col-md-4 cart-main-container-right">
        <div className="container cart-buy-card">
          <span>
            <b>
              SubTotal ({cartCtx.cartInfo.totalQty} items) :
              {NumberUtil.toIndianCurrency(
                cartCtx.cartInfo.netAmount ? cartCtx.cartInfo.netAmount : 0
              )}
            </b>
          </span>
          <span>
            <button
              className="btn btn-warning btn-sm"
              onClick={proceedToBuyHandler}
              disabled={authCtx.ecomuser.isloggedin ? false : true}
            >
              Proceed to Buy
            </button>
          </span>
        </div>
        <div className="cart-card">
          Recently Viewed Items
          <ul>
            <li>item</li>
          </ul>
        </div>
      </div>

      {checkoutmodal && (
        <CheckoutModal
          data={cartCtx}
          show={checkoutmodal}
          onClose={checkoutmodalCloseHandler}
        />
      )}
    </div>
  );
};

export default EcomCart;
