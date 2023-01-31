import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const { totalQty } = cartCtx;

  const btnClasses = `${classes.button}`;

  return (
    <button className={btnClasses}>
      <span className={classes.icon}>
        <FontAwesomeIcon icon={faShoppingCart} />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{totalQty}</span>
    </button>
  );
};

export default CartButton;
