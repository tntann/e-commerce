import React, { useState } from "react";
import { productInfoTabs } from "../../utils/contains";

// const activedStyles = "";
// const notActivedStyles = "";

const ProductInfoTab = () => {
  const [activedTab, setActivedTab] = useState(1);
  return (
    <div>
      <div className="flex items-center gap-1 relative bottom-[-1px]">
        {productInfoTabs.map((el) => (
          <span
            className={`py-2 text-[#505050] px-4 cursor-pointer ${
              activedTab === el.id
                ? " bg-white border border-b-0"
                : "bg-[#f1f1f1]"
            }`}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border p-4">
        {productInfoTabs.some((el) => el.id === activedTab) &&
          productInfoTabs.find((el) => el.id === activedTab)?.content}
      </div>
    </div>
  );
};

export default ProductInfoTab;
