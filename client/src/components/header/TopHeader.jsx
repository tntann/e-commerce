import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../../utils/path";
import { getCurrent } from "../../app/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../utils/icons";
import { logout } from "../../app/user/userSlice";

const { RiLogoutCircleRLine } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) dispatch(getCurrent());
  }, [dispatch, isLoggedIn]);
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between font-normal text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+84) 963 300 334</span>
        {isLoggedIn ? (
          <div className="flex gap-2 text-sm items-center">
            <span>{`Welcome, ${current?.lastname} ${current?.firstname}`}</span>
            <span
              onClick={() => dispatch(logout())}
              className="cursor-pointer hover:rounded-full hover:bg-slate-100 hover:text-main p-1"
            >
              <RiLogoutCircleRLine size={20} />
            </span>
          </div>
        ) : (
          <Link
            to={`/${path.LOGIN}`}
            className="hover:text-[#151515] cursor-pointer"
          >
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopHeader;