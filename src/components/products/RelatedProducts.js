import { Fragment, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const data = [
  { img: "M30I20983_display_0.jpg" },
  { img: "M30I20983_display_1.jpg" },
  { img: "M30I20983_display_2.jpg" },
  { img: "M30I20983_display_3.jpg" },
  { img: "M30I20983_display_4.jpg" },
  { img: "M30I20983_display_5.jpg" },
  { img: "M30I20983_display_6.jpg" },
  { img: "M30I20983_display_7.jpg" },
  { img: "M30I20983_display_8.jpg" },
  { img: "M30I20983_display_9.jpg" },
];

const imgurl = process.env.REACT_APP_IMAGESERVER_URL + "/";

const RelatedProducts = () => {
  useEffect(() => {
    let items = document.querySelectorAll(".carousel .carousel-item");

    items.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  }, []);

  return (
    <Fragment>
      {/* <Carousel
        wrap={true}
      >
        {data.map((item, index) => (
          <CarouselItem key={"rel_prod_" + index} className="carousel__item">
            <Image
              src={"http://localhost:8000/" + item.img}
              style={{ maxHeight: "150px" }}
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </CarouselItem>
        ))}
      </Carousel> */}

      <div className="container text-center my-3">
        <div className="row mx-auto my-auto justify-content-center">
          <div
            id="relatedProductsCarousel"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner" role="listbox">
              <div className="carousel-item active">
                <div className="col-md-3">
                  <div className="card">
                    <div className="card-img">
                      <img
                        src={imgurl + data[0].img}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    {/* <div
                      className="card-img-overlay"
                      style={{ color: "white" }}
                    >
                      Slide default
                    </div> */}
                  </div>
                </div>
              </div>
              {data.slice(1).map((item, index) => (
                <div className="carousel-item" key={item + "_" + index}>
                  <div className="col-md-3">
                    <div className="card">
                      <div className="card-img">
                        <img src={imgurl + item.img} className="img-fluid" alt="" />
                      </div>
                      {/* <div
                        className="card-img-overlay"
                        style={{ color: "white" }}
                      >
                        Slide {index}
                      </div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <a
              class="carousel-control-prev bg-transparent w-aut"
              href="#relatedProductsCarousel"
              role="button"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
            </a>
            <a
              class="carousel-control-next bg-transparent w-aut"
              href="#relatedProductsCarousel"
              role="button"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RelatedProducts;
