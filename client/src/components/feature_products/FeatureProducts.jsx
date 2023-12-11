import React, { useState, useEffect } from "react";
import { ProductCard } from "../";
import { apiGetProducts } from "../../apis";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, sort: "-totalRatings" });
    if (response.success) setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-main">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        YOU&#39;LL PROBABLY LIKE
      </h3>
      <div className="flex flex-wrap mt-5 mx-[-10px]">
        {products?.map((el) => (
          <ProductCard key={el._id} pid={el._id} image={el.thumb} {...el} />
        ))}
      </div>

      {/* banner bottom home */}
      <div className="grid grid-cols-4 grid-rows-2 gap-4 cursor-pointer">
        <img
          src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1702022943/ecommerce/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x_lb4qob.webp"
          alt=""
          className="w-full h-full object-cover col-span-2 row-span-2"
        />
        <img
          src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1702022943/ecommerce/banner2-bottom-home2_400x_velmiq.webp"
          alt=""
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
        <img
          src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1702022943/ecommerce/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x_j7ybi3.webp"
          alt=""
          className="w-full h-full object-cover col-span-1 row-span-2"
        />
        <img
          src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1702022943/ecommerce/banner3-bottom-home2_400x_jufcju.webp"
          alt=""
          className="w-full h-full object-cover col-span-1 row-span-1"
        />
      </div>
    </div>
  );
};

export default FeatureProducts;
