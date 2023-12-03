import React from "react";
import logo from "../../assets/hephonelogo.png";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import path from "../../utils/path";
import { useSelector } from "react-redux";

const {
  PiPhoneCallBold,
  MdMailOutline,
  AiOutlineShoppingCart,
  FaRegUserCircle,
} = icons;
const Header = () => {
  const { current } = useSelector((state) => state.user);
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
        <div className="flex items-center justify-center gap-2 px-6 cursor-pointer border-r">
          <AiOutlineShoppingCart color="#ee3131" size={24} />
          <span>0 item(s)</span>
        </div>

        <Link
          to={
            +current?.role === 1
              ? `/${path.ADMIN}/${path.DASHBOARD}`
              : `/${path.USER}/${path.PERSONAL}`
          }
          className="flex items-center justify-center gap-2 px-6 cursor-pointer"
        >
          <FaRegUserCircle color="#ee3131" size={24} />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
