import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const Rating = ({ rating, size }) => {
  const fullStars = Math.floor(Number(rating));

  let halfStars = 0;
  if (rating - fullStars >= 0.5) {
    halfStars = 1;
  }
  const emptyStars = 5 - fullStars - halfStars;

  size = size ? size : 15;

  //console.log(rating, fullStars, halfStars, emptyStars, rating - fullStars);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => (
        <BsStarFill color="#ff9529" key={"asdhfajg_" + i} size={size} />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <BsStarHalf color="#ff9529" size={size} key={"ahrehvae_" + i} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <BsStar color="gray" size={size} key={"weoihoasd_" + i} />
      ))}
    </>
  );
};

export default Rating;
