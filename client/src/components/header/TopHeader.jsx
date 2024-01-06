import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../../utils/path";
import { getCurrent } from "../../app/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../utils/icons";
import { logout, clearMessage } from "../../app/user/userSlice";
import Swal from "sweetalert2";

const { RiLogoutCircleRLine } = icons;

const TopHeader = () => {
  const { isLoggedIn, current, mess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (mess)
      Swal.fire("Opps!", mess, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mess]);
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between font-normal text-xs text-white">
        <span className="hidden md:inline-block">
          ORDER ONLINE OR CALL US (+84) 963 300 334
        </span>
        {isLoggedIn && current ? (
          <div className="flex gap-2 w-full md:w-fit text-sm justify-between md:justify-start items-center">
            <span className="pl-2">{`Welcome, ${current?.lastname} ${current?.firstname}`}</span>
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
            className="hover:text-[#151515] cursor-pointer pl-2"
          >
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
