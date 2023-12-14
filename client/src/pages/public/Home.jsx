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
    <>
      <div className="w-main flex relative mt-6">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar />
          <DealDaily />
        </div>

        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>

      {/* Feature Products, YOU'LL PROBABLY LIKE */}
      <div className="my-8">
        <FeatureProducts />
      </div>

      {/* New Products */}
      <div className="my-8 ">
        <NewProducts />
      </div>

      {/* FEATURED CATEGORIES */}
      <div className="my-8 ">
        <FeatureCategories />
      </div>

      {/* TECHNOLOGY NEWS */}
      <div className="my-8 w-main m-auto">
        <Blogs />
      </div>
    </>
  );
};

export default withBaseComponent(Home);
