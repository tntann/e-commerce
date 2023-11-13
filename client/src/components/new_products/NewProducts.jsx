import React from "react";
import { CustomSlider2 } from "..";
import { useSelector } from "react-redux";

const NewProducts = () => {
  const { newProducts } = useSelector((state) => state.products);
  return (
    <div className="w-main">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        NEW PRODUCTS
      </h3>
      <div className="mt-5 mx-[-10px]">
        <CustomSlider2 products={newProducts} />
      </div>
    </div>
  );
};

export default NewProducts;
