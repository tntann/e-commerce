import React, { Fragment, useEffect, useState } from "react";
import logo from "../../assets/hephonelogo.png";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import path from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/user/userSlice";

const {
  PiPhoneCallBold,
  MdMailOutline,
  AiOutlineShoppingCart,
  FaRegUserCircle,
} = icons;
const Header = () => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");

      // Check if the profile element exists before accessing its properties
      if (profile && !profile.contains(e.target)) {
        setIsShowOption(false);
      }
    };

    document.addEventListener("click", handleClickoutOptions);

    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);

  return (
    <div className="w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img
          src={logo}
          alt="logo"
          className="w-[234px] h-[40px] object-contain"
        />
      </Link>
      <div className="flex text-[13px] ">
        <div className="flex flex-col px-6 border-r items-center">
          <span className="flex gap-4 items-center">
            <PiPhoneCallBold color="#ee3131" size={16} />
            <span className="font-semibold">(+84) 963 300 334</span>
          </span>
          <span>Mon-Sat 8:00 AM - 9:00 PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-4 items-center">
            <MdMailOutline color="#ee3131" size={16} />
            <span className="font-semibold">SUPPORT@HEMOBILE.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div className="flex items-center justify-center gap-2 px-6 cursor-pointer border-r">
              <AiOutlineShoppingCart color="#ee3131" size={24} />
              <span>0 item(s)</span>
            </div>

            <div
              className="flex cursor-pointer items-center justify-center px-6 gap-2 relative"
              onClick={() => setIsShowOption((prev) => !prev)}
              id="profile"
            >
              <FaRegUserCircle color="#ee3131" size={24} />
              <span>Profile</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-full flex-col flex left-[16px] bg-gray-100 border min-w-[150px] py-2 z-50"
                >
                  <Link
                    className="p-2 w-full hover:bg-sky-100"
                    to={`/${path.USER}/${path.PERSONAL}`}
                  >
                    Info
                  </Link>
                  {+current.role === 1 && (
                    <Link
                      className="p-2 w-full hover:bg-sky-100"
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                    >
                      Admin
                    </Link>
                  )}
                  <span
                    onClick={() => dispatch(logout())}
                    className="p-2 w-full hover:bg-sky-100"
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
