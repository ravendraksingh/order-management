import React, { useState, useEffect } from "react";

const CartContext = React.createContext({
  cart: [],
  info: {},
  onAddProduct: () => {},
  onUpdateQty: () => {},
  onDeleteProduct: () => {},
});

export const CartContextProvider = (props) => {
  const [cartInfoState, setCartInfoState] = useState({
    cart: [],
    info: {
      totalQty: 0,
      totalMRP: 0.0,
      totalSaving: 0.0,
      netAmount: 0.0,
    },
  });

  useEffect(() => {
    //resetCartInfoState();
    const localCart = getCartFromStorage();
    //console.log("in useEffect");
    if (localCart !== null) {
      updateCartInfoState(localCart);
    }
  }, []);

  const addProduct = (product) => {
    // console.log("in addProductToCart");
    let localCart = getCartFromStorage();
    product = {
      ...product,
      quantity: 1,
    };
    localCart = [...localCart, product];
    setCartInStorage(localCart);
    updateCartInfoState(localCart);
  };

  const updateCartInfoState = (cartParam) => {
    let var1 = {
      cart: cartParam,
      info: getCartInfo(cartParam),
    };
    setCartInfoState(var1);
  };

  const updateQuantity = (productid, quantity) => {
    // console.log("in updateQuantity");
    let localCart = getCartFromStorage();

    let newCart = localCart;
    for (let item of newCart) {
      if (item.id === productid) {
        item.quantity = quantity;
      }
    }
    setCartInStorage(localCart);
    updateCartInfoState(localCart);
  };

  const deleteProduct = (id) => {
    // console.log("in deleteProduct in CartContext.js");
    const localCart = getCartFromStorage();
    //const productItem = localCart.find((item) => item.id === id);
    let newCart = localCart.filter((item) => item.id !== id);
    if (newCart?.length === 0) {
      removeCartFromStorage();
      resetCartInfoState();
    } else {
      setCartInStorage(newCart);
      updateCartInfoState(newCart);
    }
  };

  const resetCartInfoState = () => {
    let var2 = {
      cart: [],
      info: {
        totalQty: 0,
        totalMRP: 0.0,
        totalSaving: 0.0,
        netAmount: 0.0,
      },
    };
    setCartInfoState(var2);
  };

  const getCartInfo = (cart) => {
    const total_mrp = getTotalMRPInCart(cart);
    const total_discount = getTotalDiscountInCart(cart);
    const total_netamt = getTotalNetAmountInCart(cart);
    const total_quantity = getTotalQtyInCart(cart);

    const info = {
      totalQty: total_quantity,
      totalMRP: total_mrp,
      totalSaving: total_discount,
      netAmount: total_netamt,
    };
    return info;
  };

  const getTotalQtyInCart = (cart) => {
    let total = 0;
    total = cart.reduce((curTotal, item) => {
      return curTotal + +item.quantity;
    }, 0);
    return total;
  };

  const getTotalNetAmountInCart = (cart) => {
    return getTotalValueForType(cart, "retail");
  };

  const getTotalMRPInCart = (cart) => {
    return getTotalValueForType(cart, "mrp");
  };

  const getTotalDiscountInCart = (cart) => {
    return getTotalValueForType(cart, "discount");
  };

  const getTotalValueForType = (cart, type) => {
    let amountValue = parseFloat(0.0);
    if (type === "retail") {
      amountValue = cart.reduce((curTotal, item) => {
        return curTotal + item.price_info.retail * item.quantity;
      }, 0);
    } else if (type === "mrp") {
      amountValue = cart.reduce((curTotal, item) => {
        return curTotal + item.price_info.mrp * item.quantity;
      }, 0);
    } else if (type === "discount") {
      amountValue = cart.reduce((curTotal, item) => {
        return curTotal + item.price_info.discount * item.quantity;
    }, 0);
    }
    return amountValue;
  };

  const setCartInStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const getCartFromStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    return cart;
  };

  const removeCartFromStorage = () => {
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart: cartInfoState.cart,
        cartInfo: cartInfoState.info,
        onAddProduct: addProduct,
        onUpdateQty: updateQuantity,
        onDeleteProduct: deleteProduct,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
