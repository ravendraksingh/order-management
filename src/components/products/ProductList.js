import React, { Fragment, useEffect, useState } from "react";

import { Row, Col, Card, Button } from "react-bootstrap";
import "./ProductList.css";
import axios from "axios";
// import useWindowDimensions from "../../utils/ScreenUtil";
//import EcomApiService from "../../services/EcomApiService";
import { Link } from "react-router-dom";
import ProductService from "../service/ProductService";
import Rating from "../UI/Rating";
import * as NumUtils from "../../utils/NumberUtil";
//import ProductReducer from "../../reducers/ProductReducer";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filters, setFilters] = useState({
    category: "All",
    rating: 1,
  });
  const [sortby, setSortby] = useState({});

  //Ravendra: 7-nov-2022 5:36pm
  //using window dimensons
  //const { width, height } = useWindowDimensions();
  //console.log('in productList.js width:' + width + ' ::height:' + height);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      //commented the below line to use EcomApiService
      //7-Nov-2022 1:30pm - did not work as required
      const response = await axios.get(
        "http://localhost:8100/api/v1/products/search"
      );
      //const response = EcomApiService.getAllProducts();
      const result = response.data;

      const loadedProducts = [];
      //console.log("result -->", result);
      for (const key in result) {
        //console.log('key-->', key);
        loadedProducts.push({
          sku: result[key].sku,
          name: result[key].name,
          desc: result[key].description,
          image_url: result[key].images.default,
          category: result[key].category,
          price_info: result[key].price_info,
          rating: result[key].rating,
        });
      }
      //console.log("loadedProducts-->", loadedProducts);
      setProducts(loadedProducts);
      setFilteredProducts(loadedProducts);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    ProductService.fetchAllCategories()
      .then((response) => {
        //console.log(response.data);
        setCategoryOptions([
          {
            id: "all",
            name: "All",
            description: "All",
          },
          ...response.data,
        ]);
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          console.log(error.response.data);
        }
      });
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (filters && filters.category) {
      filtered =
        filters.category === "All"
          ? filtered
          : filtered.filter((prod) => prod.category === filters.category);
    }
    if (filters && filters.rating) {
      filtered = filtered.filter((p) => p.rating >= filters.rating);
    }

    // Sort products
    if (sortby && sortby.price) {
      filtered = filtered.sort((a, b) =>
        sortby.price === "priceAsc"
          ? a.price_info.retail - b.price_info.retail
          : b.price_info.retail - a.price_info.retail
      );
    }

    setFilteredProducts(filtered);
    //console.log(filtered);
  }, [filters, sortby, products]);

  const categoryChangeHandler = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, category: e.target.value }));
  };

  const ratingFilterHandler = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, rating: e.target.value }));
  };

  const sortbyHandler = (e) => {
    console.log(e.target.value);
    setSortby({
      price: e.target.value,
    });
  };

  if (error) {
    console.log("error", error);
    setError(error);
  }

  return (
    <Fragment>
      {error && <p>Error occurred </p>}
      {isLoading && (
        <h2>
          <p align="center">Loading...</p>
          <p align="center">Check if catalog-service is up at port 8100</p>
        </h2>
      )}
      <br />
      {/* <Row className="row" xs={1} sm={2} md={3}> */}
      <Row id="mainContainer">
        <Col className="col-3 col-md-3 d-none d-sm-block">
          <div className="mx-2 mb-3">
            <b>Categories</b>
            <select
              placeholder="choose your category"
              onChange={categoryChangeHandler}
            >
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.description}
                </option>
              ))}
            </select>
          </div>
          <div className="mx-2 mb-3">
            <b>Delivery Day</b>
            <div>
              <input type="checkbox" key="bytomm" className="mx-2" />
              Get it by Tomorrow
            </div>
            <div>
              <input type="checkbox" key="in2days" className="mx-2" />
              Get it in 2 Days
            </div>
          </div>
          <div className="mx-2 mb-3">
            <b>Customer Review</b>
            {[5, 4, 3, 2, 1].map((val, i) => (
              <div key={"wzpin##" + i}>
                <input
                  type="radio"
                  name="ratingFilter"
                  className="mx-2"
                  value={val}
                  onClick={ratingFilterHandler}
                  key={"rctyr#" + i}
                />
                <Rating rating={val} key={"i2nw0$" + val} />
              </div>
            ))}
          </div>
          <div className="mx-2 mb-3">
            <Button
              variant="warning"
              className="btn btn-sm"
              style={{ minWidth: "110px" }}
              onClick={() => {
                setFilters({
                  category: "All",
                  rating: 1,
                });
              }}
            >
              Clear Filters
            </Button>
          </div>
          <div className="mx-2 mb-3">
            <b>Sort By</b>
            <div>Price</div>
            <div>
              <input
                type="radio"
                name="sortby"
                value="priceAsc"
                className="mx-2"
                onClick={sortbyHandler}
              />
              Ascending
              <input
                type="radio"
                name="sortby"
                value="priceDesc"
                className="mx-2"
                onClick={sortbyHandler}
              />
              Descending
            </div>
            <div className="my-2">
              <Button
                variant="warning"
                className="btn btn-sm"
                style={{ minWidth: "110px" }}
                onClick={() => {
                  setSortby({});
                }}
              >
                Clear Sorting
              </Button>
            </div>
          </div>
        </Col>
        <Col className="col-md-9">
          <Row xs={1} sm={2} md={2} lg={3}>
            {/* {products.map((product, index) => ( */}
            {filteredProducts.map((product) => (
              <Col className="col" key={product.sku}>
                <Card className="card mb-3 mx-2 product-card">
                  <Card.Img
                    variant="top"
                    src={product.image_url}
                    className="img-thumbnail mx-auto product-card-img"
                  />
                  <Card.Body>
                    <Card.Title className="pdcard__name">
                      {product.name}
                    </Card.Title>
                    <Card.Subtitle style={{ marginBottom: 10 }}>
                      <div style={{ marginBottom: "5px" }}>
                        <Rating rating={product.rating} />
                      </div>
                      <div>
                        <span className="price-mrp">
                          {NumUtils.toIndianCurrency(product.price_info.mrp)}
                        </span>
                        <span className="price">
                          {NumUtils.toIndianCurrency(product.price_info.retail)}
                        </span>
                      </div>
                    </Card.Subtitle>
                    <Card.Text className="pdcard__desc">
                      {/* <a href={'/products/'+product.sku} className="m-product-card">{product.desc}</a> */}
                      <Link to={product.sku}>{product.desc}</Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductList;
