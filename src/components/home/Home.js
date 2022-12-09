import React, { Fragment } from "react";
import { Carousel } from "react-bootstrap";
import useWindowDimensions from "../../utils/ScreenUtil";

const imgurl = process.env.REACT_APP_IMAGESERVER_URL;

const Home = () => {

  const { width, height } = useWindowDimensions();
  console.log('in home.js width:' + width + ' ::height:' + height);

  return (
    <Fragment>
      <div style={{ height: "100%", width: "100%" }}>
        <Carousel variant="dark" interval={3000}>
          <Carousel.Item>
            <img
              className="img-thumbnail"
              src={imgurl+'/81ypGyfK8mL._SX3000_.jpg'}
              alt="First slide"
            />
            {/* <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-thumbnail"
              src={imgurl+'/71g7J06YvzL._SX3000_.jpg'}
              alt="Second slide"
            />
            {/* <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-thumbnail"
              src={imgurl+"/61lc-H3DWfL._SX3000_.jpg"}
              alt="Third slide" 
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-thumbnail"
              src={imgurl+"/A1Rp1a1+M1L._SX3000_.jpg"} alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-thumbnail"
              src={imgurl+"/7151E0XLPeL._SX3000_.jpg"} alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-thumbnail"
              src={imgurl+"/61nO2HcPYpL._SX3000_.jpg"} alt=""
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-thumbnail"
              src={imgurl+"/61Bu7HbKTGL._SX3000_.jpg"} alt="" 
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </Fragment>
  );
};

export default Home;
