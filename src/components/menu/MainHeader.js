/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { Fragment, useState, useEffect, useContext } from "react";

import { Badge, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "../user/LoginModal";
import "../cart/cart.css";
import "./MainHeader.css";
import "../user/LoginModal.css";

import useWindowDimensions from "../../utils/ScreenUtil";
//import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import AuthContext from "../../context/AuthContext";
//import DeviceContext from "../../context/DeviceContext";
import SideNav from "./SideNav";
import CartContext from "../../context/CartContext";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import CartButton from "../cart/CartButton";
import { GiHamburgerMenu } from "react-icons/gi";

const MainHeader = (props) => {
  const [show, setShow] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const authCtx = useContext(AuthContext);
  //console.log(authCtx.ecomuser);
  const { width: screenwidth } = useWindowDimensions();
  //console.log(screenwidth, screenHeight);
  const cartCtx = useContext(CartContext);
  // console.log("cartcontext in MainHeader.js");
  // console.log(cartCtx);

  const [opensidebar, setOpensidebar] = useState({
    open: false,
    height: "100vh",
    width: "0",
  });

  const loginClickHandler = () => {
    setShow(true);
  };

  const emailInputChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };

  const passwordInputChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const loginFormSubmitHandler = (e) => {
    e.preventDefault();
    let user = {
      email: userInput.email,
      firstname: userInput.email,
      lastname: "",
      image_url: "",
      isloggedin: true,
      googleauth: false,
    };
    authCtx.onLogin(user);
    // setUserInput({
    //   email: '',
    //   password: ''
    // });
    setShow(false);
  };

  const logoutBtnClickHandler = (e) => {
    e.preventDefault();
    //logoutCleanUp();
    authCtx.onLogout();
  };

  /**
   * Google authentication method
   */
  useEffect(() => {
    const initClient = () => {
      //gapi.client.init({
      gapi.auth2.init({
        clientId: googleClientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  // const onSuccess = (res) => {
  //   console.log("success:", res);
  //   const user = {
  //     email: res.profileObj.email,
  //     firstname: res.profileObj.givenName,
  //     lastname: res.profileObj.familyName,
  //     image_url: res.profileObj.imageUrl,
  //     isloggedin: true,
  //     googleauth: true,
  //   };
  //   authCtx.onLogin(user);
  //   setShow(false);
  // };

  // const onFailure = (err) => {
  //   console.log("failed:", err);
  // };

  // const logOut = () => {
  //   authcontext.onLogout();
  //   logoutCleanUp();
  // };

  const openSideNavHandler = () => {
    //console.log("openSideNav in MainHeader.js clicked");
    let currentWidth = "300px";
    if (screenwidth !== null && screenwidth < 450) {
      currentWidth = "100vw";
    }
    setOpensidebar((prevState) => ({
      ...prevState,
      open: true,
      //width: "250px"
      width: currentWidth,
      height: "100vh",
    }));
  };

  const closeSideNavHandler = () => {
    //console.log("closeSideNavHandler in MainHeader.js clicked");
    setOpensidebar((prevState) => ({
      ...prevState,
      open: false,
      width: "0",
    }));
  };

  return (
    <Fragment>
      <SideNav sidebar={opensidebar} onCloseSideNav={closeSideNavHandler} />

      {/* <nav className="navbar sticky-top navbar-expand-xl navbar-dark header__navbar"> */}
      <nav
        id="id_main_header"
        className="navbar navbar-expand-md navbar-expand-xl navbar-dark header__navbar"
      >
        <div className="header__navbar-items-left">
          <span
            className="sidenav_hamburger_icon"
            style={{ color: "white", fontSize: "25px", cursor: "pointer" }}
            onClick={openSideNavHandler}
          >
            {/* &#9776; */}
            <GiHamburgerMenu />
          </span>
          <form className="header__form" action="/products">
            <div className="row">
              <div className="col-9">
                <input
                  className="header__form-input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </div>
              <div className="col-3">
                <button
                  className="btn btn-sm btn-outline-success"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="header__navbar-items-right">
          {authCtx?.ecomuser.isloggedin && !authCtx?.ecomuser.googleauth && (
            <span className="header__navbar-userinfo">
              Hi,{" "}
              {authCtx.ecomuser.firstname
                ? authCtx.ecomuser.firstname
                : authCtx.ecomuser.email}
            </span>
          )}
          {authCtx?.ecomuser.isloggedin && (
            <a
              href="#"
              style={{ marginLeft: "10px", color: "#f00a0a" }}
              onClick={logoutBtnClickHandler}
            >
              Logout
            </a>
          )}
          {!authCtx?.ecomuser.isloggedin && (
            <a href="#" style={{ color: "white" }} onClick={loginClickHandler}>
              Login
            </a>
          )}
          {/* {authCtx?.ecomuser.isloggedin && authCtx?.ecomuser.googleauth && (
            <Nav className="ms-auto navbar-nav">
              <img
                src={
                  authCtx.ecomuser.image_url ? authCtx.ecomuser.image_url : ""
                }
                alt="avatar"
                style={{
                  maxHeight: "40px",
                  marginTop: "2px",
                  marginBottom: "2px",
                }}
              />
              <Nav.Link href="#" style={{ color: "#007bff" }}>
                Hi,{" "}
                {authCtx?.ecomuser.firstname
                  ? authCtx?.ecomuser.firstname
                  : authCtx?.ecomuser.email}
              </Nav.Link>
              <div style={{ marginTop: "2px", marginBottom: "2px" }}>
                <GoogleLogout
                  clientId={googleClientId}
                  buttonText="Log-out"
                  onLogoutSuccess={logOut}
                />
              </div>
            </Nav>
          )} */}
          <Nav.Link
            as={Link}
            to="/ecom/cart"
            className="header__navbar-navlink"
          >
            {/* <Badge
              className="header__navbar-lbl-cartbadge"
              style={{ color: "red" }}
            >
              {cartCtx.totalQty}
            </Badge> */}
            <Badge id="badge" className="header__navbar-lbl-cartbadge">
              {/* {props.dataFromApp} */}
              {cartCtx.cartInfo.totalQty}
            </Badge>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="header__navbar-cart"
            />
            {/* <Cart className="header__navbar-cart"></Cart> */}
          </Nav.Link>

          {/* <CartButton /> */}

          {show && (
            <div>
              <LoginModal
                title="Sign-In to your account"
                onClose={() => setShow(false)}
                show={show}
              >
                <form onSubmit={loginFormSubmitHandler}>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="name" className="modal-body-heading">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={userInput.email}
                        onChange={emailInputChangeHandler}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="password1"
                        className="form-label modal-body-heading"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password1"
                        value={userInput.password}
                        onChange={passwordInputChangeHandler}
                      />
                    </div>
                    <div
                      style={{ alignContent: "center", textAlign: "center" }}
                    >
                      <button className="btn btn-primary mx-2">Submit</button>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => setShow(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </LoginModal>
            </div>
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default MainHeader;
