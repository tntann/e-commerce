import React from "react";
import { Outlet } from "react-router-dom";
import { TopHeader, Header, Navbar, Footer } from "../../components";

const Public = () => {
  return (
    <div className=" max-h-screen overflow-y-auto flex flex-col items-center">
      <div className="w-full">
        <TopHeader />
      </div>
      <Header />
      <Navbar />
      <div className=" w-full flex flex-col items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
