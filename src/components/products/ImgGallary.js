import React from "react";
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
//import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";
import ImageGallery from "react-image-gallery";

// const host = "http://localhost:8000/";

const data = [
//   { original: host + "M30I20983_display_0.jpg" },
//   { original: host + "M30I20983_display_1.jpg" },
//   { original: host + "M30I20983_display_2.jpg" },
//   { original: host + "M30I20983_display_3.jpg" },
//   { original: host + "M30I20983_display_4.jpg" },
//   { original: host + "M30I20983_display_5.jpg" },
//   { original: host + "M30I20983_display_6.jpg" },
//   { original: host + "M30I20983_display_7.jpg" },
//   { original: host + "M30I20983_display_8.jpg" },
//   { original: host + "M30I20983_display_9.jpg" },
{
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1020/1000/600/',
    thumbnail: 'https://picsum.photos/id/1020/250/150/',
  },{
    original: 'https://picsum.photos/id/1021/1000/600/',
    thumbnail: 'https://picsum.photos/id/1021/250/150/',
  },
];

const ImgGallary = () => {
  return <ImageGallery items={data} />;
};

export default ImgGallary;
