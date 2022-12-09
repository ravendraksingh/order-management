import { Fragment, useState } from "react";
import { Carousel, CarouselItem, Image } from "react-bootstrap";

const data = [
  { img: "M30I20983_display_1.jpg" },
  { img: "M30I20983_display_2.jpg" },
  { img: "M30I20983_display_3.jpg" },
  { img: "M30I20983_display_4.jpg" },
  { img: "M30I20983_display_5.jpg" },
];

const RelatedProducts = (props) => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Fragment>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {data.map((item, index) => (
          <CarouselItem key={"rel_prod_"+index}>
            <Image src={"http://localhost:8000/" + item.img} style={{maxHeight: "150px"}} />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </CarouselItem>
        ))}
      </Carousel>
    </Fragment>
  );
};

export default RelatedProducts;
