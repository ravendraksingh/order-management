import React, { Fragment, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./maincontainer.css";
import Home from "../home/Home";
import MainHeader from "../menu/MainHeader";
import Checkout from "../checkout/Checkout";
/**
 * Ravendra Singh: 03-Oct-2022 12:38 PM
 * import were commented to enable lazy loading of these components
 */
//import OrderHome from "./components/orders/OrderHome";
import ProductList from "../products/ProductList";
import ProductDetails from "../products/ProductDetails";
//import Cart from "../Cart/Cart";
//import Login from "../user/Login";
import EcomNav from "../menu/EcomNav";
//=import UserContext, { getUserObject } from "../../contexts/User";

//import Books from "../products/books/Books";
import MerchantResponse from "../checkout/MerchantResponse";
//import Footer from "../menu/footer";
import SideNav from "../menu/SideNav";
// import useWindowDimensions from "../../utils/ScreenUtil";
import Payment from "../checkout/Payment";
import TxnHome from "../checkout/Txn/TxnHome";

const OrderHome = React.lazy(() => import("../orders/OrderHome"));
// const ProductList = React.lazy(() => import("../products/ProductList"));
// const ProductDetails = React.lazy(() => import("../products/ProductDetails"));
const EcomCart = React.lazy(() => import("../Cart/EcomCart"));

const MainContainer = () => {
  const [cartcount, setCartcount] = useState(0);
  // const { screenwidth } = useWindowDimensions();

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    if (cart.length > 0) {
      console.log("cartcount==", cart.length);
      setCartcount(cart.length);
    }
  }, []);

  const updateCart = (savedData) => {
    console.log("updateCart in MainContiner.js");
    if (savedData !== null) {
      setCartcount(savedData.cart_count);
    }
  };

  return (
    <Fragment>
      <Suspense fallback={<p>Loading...</p>}>
        <MainHeader dataFromApp={cartcount} />
        <EcomNav />
        <Routes>
          <Route path="/ecom/" element={<Home />} />
          <Route path="/ecom/home" element={<Home />} />
          <Route path="/ecom/orders" element={<OrderHome />} />
          <Route path="/ecom/products" element={<ProductList />} />
          <Route
            path="/ecom/products/:id"
            element={<ProductDetails onUpdateCart={updateCart} />}
          />
          <Route
            path="/ecom/cart"
            element={<EcomCart onUpdateCart={updateCart} />}
          />
          <Route path="/ecom/checkout" element={<Checkout />} />
          <Route path="/ecom/merchantresponse" element={<MerchantResponse />} />
          <Route path="/ecom/sidenav" element={<SideNav />} />
          <Route path="/ecom/payment" element={<Payment />} />
          <Route path="/ecom/transactions" element={<TxnHome />} />
        </Routes>
        {/* <Footer /> */}
      </Suspense>
    </Fragment>
  );
};

export default MainContainer;
