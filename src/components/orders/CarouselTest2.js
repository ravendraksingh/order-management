import React, { Fragment } from "react";
import { Carousel } from "react-bootstrap";
import image1 from '../../images/1.jpeg';
import image2 from '../../images/2.jpg';
import image3 from '../../images/3.jpg';
import image4 from '../../images/4.jpg';
import image5 from '../../images/5.jpg';
import image6 from '../../images/6.jpg';

const CarouselTest2 = (props) => {
  return (
        <div id="gallery" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
                <div className="row">
                    <div className="col">
                        <img className="img-fluid" src={image1} alt="image-1" />
                    </div>
                    <div className="col">
                        <img className="img-fluid" src={image2} alt="image-2" />
                    </div>
                    <div className="col">
                        <img className="img-fluid" src={image3} alt="image-3" />
                    </div>
                </div>
            </div>
            <div className="carousel-item">
                <div className="row">
                    <div className="col">
                        <img className="img-fluid" src={image4} alt="image-4" />
                    </div>
                    <div className="col">
                        <img className="img-fluid" src={image5} alt="image-5" />
                    </div>
                    <div className="col">
                        <img className="img-fluid" src={image6} alt="image-6" />
                    </div>
                </div> 
            </div>
        </div>
        <a class="carousel-control-prev" href="#gallery" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="false"></span>
            <span class="sr-only">Previous</span>
        </a>

        <a class="carousel-control-next" href="#gallery" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
      </div>
  );
};

export default CarouselTest2;
