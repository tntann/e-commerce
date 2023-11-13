import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/product";
import { CustomSlider } from "../";
import bannermac from "../../assets/macbook-air.png";
import bannersam from "../../assets/thumbsamsun.png";
import bannerasus from "../../assets/thumbasus.png";

import { getNewProducts } from "../../app/products/asyncActions";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: 1, name: "Best Seller" },
  { id: 2, name: "New Arrivals" },
];

// const settings = {
//   dots: false,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   pauseOnHover: true,
// };

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  // const [newProducts, setNewProducts] = useState([]);
  const [activedTab, setActivedTab] = useState(1);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);
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
    <div>
      <div className="flex text-xl gap-8 pb-[15px] mb-5 border-b-2 border-main">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold cursor-pointer leading-[23px] uppercase pr-6 border-r text-gray-400 ${
              activedTab === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>

      <div className="mt-4 mx-[-10px]">
        {/* <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el._id}
              productData={el}
              isNew={activedTab === 1 ? false : true}
            ></Product>
          ))}
        </Slider> */}
        <CustomSlider products={products} activedTab={activedTab} />
      </div>
      {/* banner */}
      <div className="w-[287.5px] flex gap-4 mt-4 cursor-pointer">
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
