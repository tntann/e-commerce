import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/product";
import { CustomSlider } from "../";
import bannermac from "../../assets/macbook-air.png";
import bannersam from "../../assets/thumbsamsun.png";
import bannerasus from "../../assets/thumbasus.png";
import clsx from "clsx";

import { getNewProducts } from "../../app/products/asyncActions";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New Arrivals" },
];

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  // const [newProducts, setNewProducts] = useState([]);
  const [activedTab, setActivedTab] = useState(1);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
  const { isShowModal } = useSelector((state) => state.appReducer);
  // console.log(newProducts);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ sort: "-sold" });
    if (response.success) {
      setBestSeller(response.products);
      setProducts(response.products);
    }
    // if (response[1]?.success) setNewProducts(response[1].products);
    // setProducts(response[0].products);
  };

  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
  }, []);

  useEffect(() => {
    if (activedTab === 1) setProducts(bestSeller);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);
  return (
    <div className={clsx(isShowModal ? "hidden" : "")}>
      <div className="flex text-xl gap-8 pb-[15px] mb-5 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold text-center md:text-start cursor-pointer leading-[23px] uppercase pr-6 border-r text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>

      <div className="mt-4  hidden md:block mx-[-10px]">
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      <div className="mt-4 md:hidden block mx-[-10px]">
        <CustomSlider
          products={products}
          slidesToShow={1}
          activedTab={activedTab}
        />
      </div>
      {/* banner */}
      <div className="lg:w-[287.5px] w-full flex flex-col md:flex-row gap-4 mt-4 cursor-pointer">
        <img
          src={bannermac}
          alt="banner"
          className="w-full flex-1 object-cover"
        />
        <img
          src={bannersam}
          alt="banner"
          className="w-full flex-1 object-cover"
        />
        <img
          src={bannerasus}
          alt="banner"
          className="w-full flex-1 object-cover"
        />
      </div>
    </div>
  );
};

export default BestSeller;
