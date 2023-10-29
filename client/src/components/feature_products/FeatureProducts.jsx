import React, { useState, useEffect } from "react";
import { ProductCard } from "../";
import { apiGetProducts } from "../../apis";

const FeatureProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, totalRatings: 5 });
    if (response.success) setProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className="flex flex-wrap mt-5 mx-[-10px]">
        {products?.map((el) => (
          <ProductCard
            key={el._id}
            image={el.thumb}
            title={el.title}
            totalRatings={el.totalRatings}
            price={el.price}
          />
        ))}
      </div>

      {/* banner bottom home */}
      <div className="flex">
        <img
          src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1698505662/ecommerce/banner-flip4-s22-ultra_de6pnt.png"
          alt="banner"
          className="object-cover w-full shadow-lg rounded-3xl"
        />

        {/* <div className="flex flex-col justify-between gap-4 w-[24%]">
          <img
            src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1698503029/ecommerce/banner2-bottom-home_bmdpfp.webp"
            alt=""
          />
          <img
            src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1698503029/ecommerce/banner3-bottom-home_cstazc.webp"
            alt=""
          />
        </div> */}

        {/* <img
          src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1698503030/ecommerce/banner4-bottom-home_md6hmk.webp"
          alt=""
          className="w-[24%] object-contain"
        /> */}
      </div>
    </div>
  );
};

export default FeatureProducts;
