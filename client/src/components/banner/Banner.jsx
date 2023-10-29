import React from "react";
import banner from "../../assets/banner1.png";

const Banner = () => {
  return (
    <div className="w-full">
      <img
        src={banner}
        alt="banner"
        className="h-[395px] w-full object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default Banner;
