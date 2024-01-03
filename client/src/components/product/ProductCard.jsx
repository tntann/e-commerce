import React from "react";
import {
  formatMoney,
  formatPrice,
  renderStartFromNumber,
} from "../../utils/helper";
import withBaseComponent from "../../hocs/withBaseComponent";

const ProductCard = ({
  pid,
  image,
  title,
  totalRatings,
  price,
  navigate,
  category,
}) => {
  return (
    <div
      className="col-span-1 cursor-pointer"
      onClick={() => navigate(`/${category?.toLowerCase()}/${pid}/${title}`)}
    >
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
          <span className="text-main">{`${formatMoney(
            formatPrice(price)
          )} đ`}</span>
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

export default withBaseComponent(ProductCard);
