import React, { Fragment, useRef, useState, useEffect } from "react";
import { Badge, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";
import LoginModal from "../user/LoginModal";
import "../Cart/Cart.css";
import "./MainHeader.css";
import "./icons.css";
import "./RSModal.css";
import { useNavigate } from "react-router-dom";
import { ReactSession } from 'react-client-session';
import EcomGoogleLogin from "../user/EcomGoogleLogin"

//ReactSession.setStoreType("localStorage");

const MainHeader = (props) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const passwordRef = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartcount, setCartcount] = useState();
  let user = {};
  const navigate = useNavigate();
  let cart_count = 0;
  const [cart, setCart] = useState([{}]);
  const [profile, setProfile] = useState();

  console.log('props.dataFromApp, cartCount', props.dataFromApp);

  useEffect(() => {
    console.log('in MainHeader.js');
    const ecomuser = localStorage.getItem("ecomuser");
    if (ecomuser !== null) {
      setUsername(JSON.parse(ecomuser).fname);
      setShow(false);
      setIsLoggedIn(true);
      console.log("in MainHeader.js, username:" + JSON.parse(ecomuser));
    }
    //alert(loginStatus.isLoggedIn + loginStatus.userName);
  }, []);


  const loginClickHandler = (props) => {
    setShow(true);
  };

  const emailInputChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordInputChangeHandler = (event) => {
    setPassword(event.target.value);
  }

  const loginFormSubmitHandler = (e) => {
    //alert("inside loginFormSubmitHandler");
    e.preventDefault();
    console.log(email);
    console.log(password);
    user = {
      "email" : email,
      "fname" : "Ravendra",
      "lname" : "Singh"
    }

    sessionStorage.setItem("ecomuser", JSON.stringify(user));
    setShow(false);
    setIsLoggedIn(true);
    setUsername(user.fname);
    //ReactSession.set("username", "Bob");
    //ReactSession.get("username"); 
    //console.log('username', username);
    navigate("/ecom/products")
  };

  const logoutBtnClickHandler = (logutClickEvent) => {
    logutClickEvent.preventDefault();
    sessionStorage.removeItem("ecomuser");
    //setShow(true);
    setIsLoggedIn(false);
    navigate("/ecom/");
  }

  return (
    <Fragment>
      {/* <Container style={{marginLeft:0, marginRight:0}}> */}
      <Navbar
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        {/* <Container className="container-fluid"> */}
        {/* <Navbar.Brand href="/">M-Commerce</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/ecom">Home</Nav.Link>
            <Nav.Link as={Link} to="/ecom/products">Products</Nav.Link> 
            <Nav.Link as={Link} to="/ecom/orders" disabled={!isLoggedIn}>My-Orders</Nav.Link>
            {/* <Nav.Link href="/ecom/modal">Modal</Nav.Link> */}
            {/* <Nav.Link href="/Checkoutnew.html" target="_blank">
              Checkout
            </Nav.Link>
            <Nav.Link href="/Checkout.html" target="_blank">
              Checkout2
            </Nav.Link>
            <Nav.Link href="/HostedCheckout.html" target="_blank">
              Checkout3
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
        <Nav>
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                style={{ width: "auto", maxWidth: "400px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
        </Nav>
        {!isLoggedIn && (
          <Nav className="me-auto">
            <Nav.Link href="#" onClick={loginClickHandler} >
              Login
            </Nav.Link>
          </Nav>
        )}
        {isLoggedIn && username !== null && (
          <Nav className="me-auto">
            <Nav.Link href="#">Hi, {username}!</Nav.Link>
            <button
             className="btn btn-danger btn-sm"
             style={{
               //lineHeight: "auto",
               maxWidth: "80px",
               fontSize: "1em",
               fontWeight: "bold",
             }}
             onClick={logoutBtnClickHandler}
           >
             Logout
           </button>
           </Nav>
          )}
        <Nav.Link href="/ecom/cart">
          <div>
            <span className="m-cart-badge">
              <Badge>{props.dataFromApp}</Badge>
            </span>
            <Cart className="m-cart"></Cart>
          </div>
        </Nav.Link>
        </Navbar>
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
                  class="form-control"
                  id="email"
                  onChange={emailInputChangeHandler}
                />
              </div>
              <div class="mb-3">
                <label
                  htmlFor="password1"
                  class="form-label modal-body-heading"
                >
                  Password
                </label>
                <input
                  // ref={passwordRef}
                  type="password"
                  class="form-control"
                  id="password1"
                  onChange={passwordInputChangeHandler}
                />
              </div>
              <div style={{ alignContent: "center", textAlign: "center" }}>
                <button class="btn btn-primary mx-2">Submit</button>
                <button
                  class="btn btn-primary mx-2"
                  onClick={() => setShow(false)}
                >
                  Close
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <EcomGoogleLogin />
              </div>
            </div>
          </form>
        </LoginModal>
      </div>
    </Fragment>
  );
};

export default MainHeader;
