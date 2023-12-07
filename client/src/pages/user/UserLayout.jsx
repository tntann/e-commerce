import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../utils/path";
import { useSelector } from "react-redux";
import { Footer, UserSidebar } from "../../components";

const UserLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  // console.log({ isLoggedIn, current });
  if (!isLoggedIn || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;

  return (
    <div className="w-full">
      <div className="flex">
        <UserSidebar />
        <div className="flex-auto bg-gray-100 min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserLayout;
