import React, { Fragment, useState } from "react";
import { Badge, Button, Container, Form, FormControl, Nav, Navbar, NavDropdown, Offcanvas } from "react-bootstrap";
import "./Cart.css"
import "./MainHeader.css"


const MainHeader2 = (props) => {

  const [cartCount, setCartCounter] = useState(0);

  const updateCartCount = () => {
    setCartCounter(cartCount+1);
    // console.log('count = ' + cartCount);
  }

  let updateCartFlag = props.updateCartInHeaderFlag;
  // console.log("in MainHeader.js || updateCartFlag = " + updateCartFlag);

  return (
    <Fragment>
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand logo-font" href="#">
            Brand
        </a>
        <button class="navbar-toggler order-first" type="button" data-toggle="collapse" data-target="#links" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-bars"></i>
        </button>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#account" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fa fa-user"></i>
        </button>

        <div class="collapse navbar-collapse" id="links">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Link 1</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link 2</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link 3</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link 4</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link 5</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Other
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">Dropdown 1</a>
                        <a class="dropdown-item" href="#">Dropdown 2</a>
                        <a class="dropdown-item" href="#">Dropdown 3</a>
                    </div>
                </li>
            </ul>
        </div>
        <div class="collapse navbar-collapse" id="account">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item"><a class="nav-link" href="#">Register</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Log in</a></li>
            </ul>
        </div>
    </div>
</nav>
    </Fragment>
  );
};

export default MainHeader2;
