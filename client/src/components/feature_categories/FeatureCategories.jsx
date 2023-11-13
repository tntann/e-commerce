import React from "react";
import { useSelector } from "react-redux";
import icons from "../../utils/icons";

const { IoIosArrowForward } = icons;

const FeatureCategories = () => {
  const { categories } = useSelector((state) => state.appReducer);
  // console.log(categories);

  return (
    <div className="w-main">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED CATEGORIES
      </h3>
      <div className="flex flex-wrap gap-5 mt-5">
        {categories
          ?.filter((el) => el.brand.length > 7)
          ?.map((el) => (
            <div key={el?._id} className="w-[393.33px]">
              <div className="border flex p-4 gap-4 min-h-[200px] rounded-lg shadow-md">
                <img
                  src={el?.image}
                  alt="category-image"
                  className="w-[144px] h-[129px] object-cover cursor-pointer"
                />
                <div className="flex-1 text-gray-700">
                  <h4 className=" font-semibold uppercase cursor-pointer">
                    {el.title}
                  </h4>
                  <ul className="text-sm cursor-pointer">
                    {el?.brand?.map((item) => (
                      <span
                        key={item}
                        className="flex gap-1 items-center text-gray-500 hover:text-main"
                      >
                        <IoIosArrowForward size={14} />
                        <li>{item}</li>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* banner bottom home */}
      <div className="flex cursor-pointer mt-5">
        <img
          src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1698505663/ecommerce/banner-a05-m34-git.gif"
          alt="banner"
          className="object-cover w-full shadow-lg rounded-3xl"
        />
      </div>
    </div>
  );
};

export default FeatureCategories;
