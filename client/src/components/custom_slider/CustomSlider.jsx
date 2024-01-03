import React from "react";
import Slider from "react-slick";
import { Product } from "../";

const CustomSlider = ({ products, activedTab, slidesToShow = 3 }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };
  return (
    <>
      {products && (
        <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el._id}
              pid={el._id}
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
