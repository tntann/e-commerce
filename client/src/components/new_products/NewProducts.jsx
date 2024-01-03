import React from "react";
import { CustomSlider2, Product } from "..";
import { useSelector } from "react-redux";

const NewProducts = () => {
  const { newProducts } = useSelector((state) => state.products);
  return (
    <div className="w-main">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        NEW PRODUCTS
      </h3>
      <div className="mt-5 hidden md:block mx-[-10px]">
        <CustomSlider2 products={newProducts} />
      </div>
      <div className="mt-5 w-screen pr-4 -ml-2 md:hidden">
        <div className="grid grid-cols-1 gap-4 w-full">
          {newProducts?.map((el, index) => (
            <div className="col-span-1" key={index}>
              <Product
                pid={el._id}
                productData={el}
                isNew={true}
                normal={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
