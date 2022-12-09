import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import "./ProductDetails.css";
//import PRODUCT_DETAILS_DATA from "../../data/PRODUCT_DETAILS";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import xtype from "xtypejs";
import { Image } from "react-bootstrap";
import CartContext from "../../context/CartContext";
import * as NumUtils from "../../utils/NumberUtil";

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
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && productItem.length === 0 && <p>No Data Found!</p>}
      {!isLoading &&
        productItem.map((product, index) => (
          <div key={product.id} className="container pd-container">
            <div className="row">
              <div id="product-image" className="col-12 col-md-5 pd-img">
                <Image
                  className="img-thumbnail"
                  src={product.productDetails.image_url_big}
                  style={{ border: "0px" }}
                />
              </div>

              <div id="product-info" className="col-12 col-md-5 pd-prodinfo">
                <div>
                  <div className="card-text">
                    <h3>{product.description}</h3>
                    <hr />
                    <table className="pricetable">
                      <tbody>
                        <tr>
                          <td className="td-col-name">M.R.P.:</td>
                          <td className="price-mrp">
                            {NumUtils.toIndianCurrency(product.pricing.list)}
                          </td>
                        </tr>
                        <tr>
                          <td className="td-col-name">Price:</td>
                          <td className="price">
                            {NumUtils.toIndianCurrency(product.pricing.retail)}
                          </td>
                        </tr>
                        <tr>
                          <td className="td-col-name">You Save:</td>
                          <td className="savings">
                            {NumUtils.toIndianCurrency(
                              product.pricing.savings ?? 0.0
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr />
                {product.productDetails?.product_spec && (
                  <div>
                    <b>Product Specification</b>
                    <table>
                      <tbody>
                        {Object.keys(product.productDetails?.product_spec).map(
                          (key, index2) => (
                            <tr
                              style={{ fontSize: "14px" }}
                              key={product.id + "tr" + index2}
                            >
                              <td
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  marginRight: "10px",
                                }}
                              >
                                {key}
                              </td>
                              <td>
                                {product.productDetails.product_spec[key]}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    <hr />
                  </div>
                )}
                {product.productDetails?.product_info?.length > 0 && (
                  <div>
                    <b>About this item</b>
                    <ul className="product-info">
                      {product.productDetails?.product_info?.map(
                        (info, index) => (
                          <li
                            style={{ fontSize: "14px", marginLeft: "10px" }}
                            key={product.id + Math.random().toString()}
                          >
                            {info}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {product.productDetails?.product_info1 &&
                  xtype(
                    product.productDetails.product_info1 === "multi_char_string"
                  ) && (
                    <div>
                      <p>
                        <b>More about this item</b>
                      </p>
                      <p style={{ textAlign: "justify" }}>
                        {product.productDetails.product_info1}
                      </p>
                    </div>
                  )}
                {product.productDetails?.product_info2 &&
                  (xtype(
                    product.productDetails.product_info2 === "single_elem_array"
                  ) ||
                    xtype(
                      product.productDetails.product_info2 ===
                        "multi_elem_array"
                    )) && (
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                        <b>more...</b>
                      </p>
                      <ul className="product-info">
                        {product.productDetails.product_info2?.map(
                          (info2, index2) => (
                            <li key={product.id + index2}>{info2}</li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>

              <div id="buybox" className="col-12 col-md-2 pd-buybox">
                <div className="">
                  <div>
                    Without Exchange:
                    <br />
                    <span className="elements price">
                      {NumUtils.toIndianCurrency(product.pricing.retail)}
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
          </div>
        ))}

      <hr />
      <div className="pd-related-container">
        <h3>Products related to this item</h3>
        <RelatedProducts pid={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
