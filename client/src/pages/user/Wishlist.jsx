import React from "react";
import { useSelector } from "react-redux";
import { Product } from "../../components";

const Wishlist = () => {
  const { current } = useSelector((s) => s.user);
  return (
    <div className="w-full relative px-4">
      <header className="text-2xl text-gray-700 font-semibold py-4 border-b border-b-blue-200">
        Favorite Products
      </header>
      <div className="p-4 w-full flex flex-wrap gap-6 justify-stretch ml-[4px] mb-4 mt-4">
        {current?.wishlist?.map((el) => (
          <div
            className="bg-white rounded-md w-[280px] drop-shadow flex flex-col py-3 gap-3"
            key={el?._id}
          >
            <Product pid={el?._id} className="bg-white" productData={el} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
