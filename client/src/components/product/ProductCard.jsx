import React from "react";
import { formatMoney, renderStartFromNumber } from "../../utils/helper";

const ProductCard = ({ image, title, totalRatings, price }) => {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <div className="flex border w-full rounded-lg shadow-sm cursor-pointer">
        <img
          src={image}
          alt="product"
          className="w-[125px] object-contain p-4"
        />
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-xs">
          <span className=" line-clamp-1 font-normal capitalize text-sm">
            {title?.toLowerCase()}
          </span>
          <span className="text-main">{`${formatMoney(price)} đ`}</span>
          <span className="flex h-4">
            {renderStartFromNumber(totalRatings, 14)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
