import React, { useState } from "react";
import noProduct from "../../assets/no-products-found.png";
import labelnew from "../../assets/new.png";
import Trend from "../../assets/Trending.png";
import { formatMoney, renderStartFromNumber } from "../../utils/helper";
import { SelectOption } from "../";
import icons from "../../utils/icons";

const { AiOutlineEye, AiOutlineMenu, AiOutlineShoppingCart } = icons;

const Product = ({ productData, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="w-full text-base px-[10px] cursor-pointer ">
      <div
        className="w-full border p-[15px] flex flex-col items-center shadow-md rounded-lg"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative ">
          {isShowOption && (
            <div className=" absolute bottom-[-10px] left-0 right-0 flex justify-center gap-5 animate-slide-top">
              <SelectOption icon={<AiOutlineMenu />} />
              <SelectOption icon={<AiOutlineEye />} />
              <SelectOption icon={<AiOutlineShoppingCart />} />
            </div>
          )}
          <img
            src={productData?.thumb || noProduct}
            alt="product"
            className="w-[243px] h-[243px] object-cover"
          />
          <img
            src={isNew ? labelnew : Trend}
            alt=""
            className=" absolute top-0 right-0 w-[75px] h-[25px] object-contain"
          />
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className=" line-clamp-1 font-normal">
            {productData?.title}
          </span>
          <span className="text-main">{`${formatMoney(
            productData?.price
          )} đ`}</span>
          <span className="flex h-4">
            {/* {renderStartFromNumber(productData?.totalRatings)} */}
            {renderStartFromNumber(productData?.totalRatings).map(
              (star, index) => (
                <span key={index}>{star}</span>
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
