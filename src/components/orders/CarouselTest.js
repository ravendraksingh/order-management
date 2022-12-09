import React, { Fragment } from "react";
import { Carousel } from "react-bootstrap";
import image1 from '../../images/1.jpeg';
import image2 from '../../images/2.jpg';
import image3 from '../../images/3.jpg';

const CarouselTest = (props) => {
  return (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Carousel variant="dark" interval={2000}>
                <Carousel.Item>
                  <img
                    className="img-thumbnail"
                    src={image1}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="img-thumbnail"
                    src={image2}
                    alt="Second slide"
                  />
                  <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="img-thumbnail"
                    src={image3}
                    alt="Third slide"
                  />
                  <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                      Praesent commodo cursus magna, vel scelerisque nisl
                      consectetur.
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        </div>
  );
};

export default CarouselTest;
