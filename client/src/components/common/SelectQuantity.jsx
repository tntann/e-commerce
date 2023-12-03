import React from "react";
import icons from "../../utils/icons";

const { AiOutlinePlus, AiOutlineMinus } = icons;

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className="flex items-center">
      <div className=" bg-[#f6f6f6] flex items-center">
        <span
          onClick={() => handleChangeQuantity("minus")}
          className="p-3 cursor-pointer border-r border-black hover:bg-gray-200"
        >
          <AiOutlineMinus />
        </span>
        <input
          type="text"
          className="py-2 outline-none w-[60px] bg-[#f6f6f6] text-center"
          value={quantity}
          onChange={(e) => handleQuantity(e.target.value)}
        />
        <span
          onClick={() => handleChangeQuantity("plus")}
          className="p-3 cursor-pointer border-l border-black hover:bg-gray-200"
        >
          <AiOutlinePlus />
        </span>
      </div>
    </div>
  );
};

export default SelectQuantity;
