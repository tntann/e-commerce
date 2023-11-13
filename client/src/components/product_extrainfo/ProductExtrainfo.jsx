import React from "react";

const ProductExtrainfo = ({ icons, title, sub }) => {
  return (
    <div className="flex items-center p-3 gap-4 mb-[10px] border">
      <span className="p-2 bg-[#505050] rounded-full flex justify-center items-center text-white">
        {icons}
      </span>
      <div className="flex flex-col text-sm text-gray-500">
        <span className=" font-medium">{title}</span>
        <span className=" text-xs">{sub}</span>
      </div>
    </div>
  );
};

export default ProductExtrainfo;
