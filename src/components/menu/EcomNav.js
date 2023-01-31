import { useContext } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./ecomnav.css";

const EcomNav = () => {
  const authCtx = useContext(AuthContext);
  //console.log(authCtx.ecomuser);

  return (
    <div id="id_ecomnav">
      <Navbar
        collapseOnSelect
        expand="md"
        //bg="dark"
        variant="dark"
        //sticky="top"
        style={{ backgroundColor: "#4c5359" }}
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/ecom/home" className="navlink">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/ecom/products" className="navlink">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/ecom/products" className="navlink">
              Best Sellers
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/ecom/orders"
              className="navlink"
              disabled={!authCtx.ecomuser.isloggedin ?? false}
            >
              Orders & Returns
            </Nav.Link>
            <Nav.Link as={Link} to="/ecom/transactions" className="navlink">
              Payments
            </Nav.Link>
            <Nav.Link as={Link} to="/ecom/checkout" className="navlink">
              Checkout
            </Nav.Link>
            <Nav.Link as={Link} to="/ecom/carousel" className="navlink">
              Carousel
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default EcomNav;
