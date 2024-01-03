import React from "react";
import Slider from "react-slick";

import banner from "../../assets/banner.png";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner4 from "../../assets/banner4.png";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

const Banner = () => {
  return (
    <Slider {...settings}>
      <div className="w-full cursor-pointer border-none outline-none">
        <img
          src={banner2}
          alt="banner"
          className="md:h-[395px] w-full  md:object-cover object-contain rounded-lg"
        />
      </div>
      <div className="w-full cursor-pointer">
        <img
          src={banner}
          alt="banner"
          className="md:h-[395px] w-full  md:object-cover object-contain rounded-lg"
        />
      </div>
      <div className="w-full cursor-pointer">
        <img
          src={banner1}
          alt="banner"
          className="md:h-[395px] w-full  md:object-cover object-contain rounded-lg"
        />
      </div>
      <div className="w-full cursor-pointer">
        <img
          src={banner4}
          alt="banner"
          className="md:h-[395px] w-full  md:object-cover object-contain rounded-lg"
        />
      </div>
    </Slider>
  );
};

export default Banner;
