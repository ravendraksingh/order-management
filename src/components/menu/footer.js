import { Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./footer.css";

const Footer = () => {
  return (
    <Fragment>
      <Navbar style={{ backgroundColor: "#4c5359" }}>
        <Nav className="me-auto ft-text">
          Copyright 1995-2022, Hexcite.com, Inc. or its affiliates
        </Nav>
      </Navbar>
    </Fragment>
  );
};

export default Footer;
