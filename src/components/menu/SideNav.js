import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

import "./sidenav.css";

const SideNav = (props) => {
  const [sidebar, setSidebar] = useState(props.sidebar);
  const closeNav = () => {
    props.onCloseSideNav();
  };

  useEffect(() => {
    setSidebar(props.sidebar);
  }, [props.sidebar]);

  return (
    <Fragment>
      {/* <AiIcons.AiOutlineClose onClick={showSidebar} className="navicon" /> */}
      <div
        className="sidenav"
        style={{
          width: sidebar.width ?? "0px",
          height: sidebar.height ?? "0px",
        }}
      >
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
          &times;
        </a>
        <Nav.Link as={Link} to="/ecom/home" className="navlink">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/ecom/products" className="navlink">
          Products
        </Nav.Link>
        <Nav.Link as={Link} to="/ecom/checkout" className="navlink">
          Checkout
        </Nav.Link>
        <Nav.Link as={Link} to="/ecom/orders" className="navlink">
          Returns & orders
        </Nav.Link>
      </div>
    </Fragment>
  );
};

export default SideNav;
