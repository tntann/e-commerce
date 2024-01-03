import React from "react";
import {
  Sidebar,
  Banner,
  BestSeller,
  DealDaily,
  FeatureProducts,
  NewProducts,
  FeatureCategories,
  Blogs,
} from "../../components";
import withBaseComponent from "../../hocs/withBaseComponent";

const Home = () => {
  // const { isLoggedIn, current } = useSelector((state) => state.user);
  // console.log({ isLoggedIn, current });
  return (
    <div className="w-full px-4">
      <div className="md:w-main m-auto flex flex-col md:flex-row mt-6">
        <div className="flex flex-col gap-5 md:w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>

        <div className="flex flex-col gap-5 md:pl-5 md:w-[75%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>

      {/* Feature Products, YOU'LL PROBABLY LIKE */}
      <div className="my-8 w-main m-auto">
        <FeatureProducts />
      </div>

      {/* New Products */}
      <div className="my-8 w-main m-auto ">
        <NewProducts />
      </div>

      {/* FEATURED CATEGORIES */}
      <div className="my-8 w-main m-auto ">
        <FeatureCategories />
      </div>

      {/* TECHNOLOGY NEWS */}
      <div className="my-8 w-main m-auto">
        <Blogs />
      </div>
    </div>
  );
};

export default withBaseComponent(Home);
