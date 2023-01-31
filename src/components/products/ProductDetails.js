import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetails.css";
//import PRODUCT_DETAILS_DATA from "../../data/PRODUCT_DETAILS";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
//import xtype from "xtypejs";
import { Image } from "react-bootstrap";
import CartContext from "../../context/CartContext";
import * as NumUtils from "../../utils/NumberUtil";
import Rating from "../UI/Rating";
// import ImgGallary from "./ImgGallary";

const ProductDetails = (props) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [productItem, setProductItem] = useState([]);
  const [itemPresentInCart, setItemPresentInCart] = useState(false);
  const navigate = useNavigate();

  const url = process.env.REACT_APP_CATALOGAPI_PRODUCTSEARCH_URL;

  const cartCtx = useContext(CartContext);
  console.log(cartCtx);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url + "/" + id);
        let items = [];
        items.push(response.data);
        setProductItem(items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
    setIsLoading(false);

    const cnt = getCartcount();
    props.onUpdateCart({
      cart_count: cnt,
    });
  }, [props.id]);

  useEffect(() => {
    const cart = getCart();
    if (cart.length > 0) {
      if (itemPresent(cart, id)) {
        setItemPresentInCart(true);
      }
    }
  }, [id]);

  const addProductToCart = (product) => {
    //console.log("in addProductToCart");
    cartCtx.onAddProduct(product);
    navigate("/ecom/cart");
  };

  function itemPresent(cart, productId) {
    let item = cart.filter((product) => {
      return product.product_id === productId;
    });
    //console.log('checking in localCart', item, item.length);
    return item.length > 0;
  }

  const getCartcount = () => {
    const cart = getCart();
    return cart.length;
  };

  const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) ?? [];
    return cart;
  };

  if (error) {
    setError(error);
    return <div>Error occurred -- {error}</div>;
  }

  return (
    <div className="container pd-container">
      {isLoading && <p>Loading...</p>}
      {!isLoading && productItem.length === 0 && <p>No Data Found!</p>}
      {!isLoading &&
        productItem.map((product, index) => (
          <div key={product.id}>
            <div className="row">
              <div id="pd-img-tn" className="col-1 pd-img-tn">
                <ul>
                  <li>
                    <img
                      src="http://localhost:8000/boatwatch_tiny_1.jpg"
                      alt="alt-img-1"
                    />
                  </li>
                  <li>
                    <img
                      src="http://localhost:8000/boatwatch_tiny_2.jpg"
                      alt="alt-img-2"
                    />
                  </li>
                  <li>
                    <img
                      src="http://localhost:8000/boatwatch_tiny_3.jpg"
                      alt="alt-img-3"
                    />
                  </li>
                  <li>
                    <img
                      src="http://localhost:8000/boatwatch_tiny_4.jpg"
                      alt="alt-img-4"
                    />
                  </li>
                  <li>
                    <img
                      src="http://localhost:8000/boatwatch_tiny_5.jpg"
                      alt="alt-img-5"
                    />
                  </li>
                </ul>
              </div>
              <div id="product-image" className="col-11 col-md-5 pd-img">
                <Image
                  className="img-thumbnail"
                  src={product.images.big ?? product.images.default}
                  style={{ border: "0px" }}
                />
              </div>

              <div id="product-info" className="col-11 col-md-4 pd-prodinfo">
                <div>
                  <div className="card-text">
                    <h3>{product.description}</h3>
                    <hr />
                    <table className="pricetable">
                      <tbody>
                        <tr>
                          <td className="td-col-name">Rating:</td>
                          <td>{<Rating rating={product.rating} />}</td>
                        </tr>
                        <tr>
                          <td className="td-col-name">M.R.P.:</td>
                          <td className="price-mrp">
                            {NumUtils.toIndianCurrency(product.price_info.mrp)}
                          </td>
                        </tr>
                        <tr>
                          <td className="td-col-name">Price:</td>
                          <td className="price">
                            {NumUtils.toIndianCurrency(
                              product.price_info.retail
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="td-col-name">You Save:</td>
                          <td className="savings">
                            {NumUtils.toIndianCurrency(
                              product.price_info.discount ?? 0.0
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr />
                {product.product_spec && (
                  <div>
                    <b>Product Specification</b>
                    <table>
                      <tbody>
                        {product.product_spec.map((spec, index) => (
                          <tr
                            style={{ fontSize: "14px" }}
                            key={"spec_" + spec.id}
                          >
                            <td
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                marginRight: "10px",
                              }}
                            >
                              {spec.key}
                            </td>
                            <td style={{ paddingLeft: "10px" }}>
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <hr />
                  </div>
                )}
                {product.product_info_list?.length > 0 && (
                  <div>
                    <b>About this item</b>
                    <ul className="product-info">
                      {product.product_info_list?.map((info, index) => (
                        <li
                          style={{ marginLeft: "10px" }}
                          key={product.id + Math.random().toString()}
                        >
                          {info}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.product_info_2 && (
                  <div>
                    <b>More ...</b>
                    <p>{product.product_info_2}</p>
                  </div>
                )}
              </div>

              <div id="buybox" className="col-11 col-md-2 pd-buybox">
                <div className="">
                  <div>
                    <span style={{ fontWeight: "bold" }}>
                      Without Exchange:
                    </span>
                    <br />
                    <span className="elements price">
                      {NumUtils.toIndianCurrency(product.price_info.retail)}
                    </span>
                  </div>
                  <div className="text-gray">Free Same Day</div>
                  <div className="elements">
                    FREE Delivery Today between 10AM - 07PM
                  </div>
                  <div>Deliver To: </div>
                  <div className="elements">Ravendra Singh, Noida</div>
                  <div
                    className="elements"
                    style={{
                      color: "green",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    In Stock
                  </div>
                  <div className="elements">
                    Sold By:{" "}
                    <span>
                      <a href="#">ABC Retail Pvt Ltd</a>
                    </span>{" "}
                    and{" "}
                    <span>
                      <a href="#">Fulfilled by Hexcite</a>
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-primary btn-block pd-buybox-btn"
                    onClick={() => addProductToCart(product)}
                    disabled={itemPresentInCart}
                  >
                    {itemPresentInCart && "Item Present in Cart"}
                    {!itemPresentInCart && "Add to Cart"}
                  </button>
                  <button
                    className="btn btn-sm btn-warning btn-block pd-buybox-btn"
                    disabled={itemPresentInCart}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}

      <div>
        <div>
          <p>
            <h3>From the manufacturer</h3>
          </p>
        </div>

        {/* <div className="d-flex align-items-center justify-content-center">
          <img src="https://m.media-amazon.com/images/S/aplus-media-library-service-media/f74b525b-2511-41c6-bf86-2a2b23c38604.__CR0,0,970,600_PT0_SX970_V1___.jpg" />
        </div> */}
      </div>

      <div className="pd-related-container">
        <span style={{ textAlign: "center" }}>
          <h3>Products related to this item</h3>
        </span>
        <RelatedProducts pid={id} />
      </div>

      {/* <div>
        <h3>Image Gallery</h3>
        <ImgGallary />
      </div> */}
    </div>
  );
};

export default ProductDetails;
