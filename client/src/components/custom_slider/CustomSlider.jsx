import React from "react";
import Slider from "react-slick";
import { Product } from "../";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

const CustomSlider = ({ products, activedTab }) => {
  return (
    <>
      {products && (
        <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el._id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
            ></Product>
          ))}
        </Slider>
      )}
    </>
  );
};

export default CustomSlider;
