import React from "react";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import path from "../../utils/path";

const { FiMapPin, PiPhoneCallBold, MdMailOutline } = icons;

const Footer = () => {
  return (
    <div className="w-full">
      {/* footer top */}
      <div className="w-ful h-[103px] bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] font-normal text-white leading-6 uppercase">
              Sign up for newsletter
            </span>
            <small className="text-[13] text-[#f8abab]">
              Sign up to receive the hottest promotions of He Mobile
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="p-4 h-[50px] pr-0 rounded-l-full w-full bg-[#f04646] outline-none text-[#faeeee] placeholder:text-sm placeholder:text-gray-200 placeholder:opacity-70"
            />
            <div className="w-[65px] h-[50px] bg-[#f04646] rounded-r-full flex justify-center items-center text-white">
              <MdMailOutline size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* footer middle */}
      <div className="w-full h-[407px] bg-[#e9edf2] flex items-center justify-center text-[13px]">
        <div className="w-main flex">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-semibold border-l-2 border-main pl-[15px]">
              ABOUT US
            </h3>
            <span className="flex items-center gap-1">
              <FiMapPin size={16} className="items-center" />
              <span className=" font-medium">Address: </span>
              <span className="text-[#363636]">
                Hoa Quy, Ngu Hanh Son, Da Nang, Vietnam
              </span>
            </span>

            <span className="flex items-center gap-1">
              <PiPhoneCallBold size={16} className="items-center" />
              <span className=" font-medium">Phone: </span>
              <span className="text-[#363636]">(+84) 963 300 334</span>
            </span>

            <span className="flex items-center gap-1">
              <MdMailOutline size={16} className="items-center" />
              <span className=" font-medium">Mail: </span>
              <span className="text-[#363636]">tntan.19it5@vku.udn.vn</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-semibold border-l-2 border-main pl-[15px]">
              INFORMATION
            </h3>
            <Link to={"/"} className="hover:text-main">
              About He Moblie
            </Link>
            <Link to={"/"} className="hover:text-main">
              Store System
            </Link>
            <Link to={"/"} className="hover:text-main">
              Service Center
            </Link>
            <Link to={"/"} className="hover:text-main">
              Privacy Policy
            </Link>
            <Link to={"/"} className="hover:text-main">
              Technology News
            </Link>
            <Link to={`/${path.FAQS}`} className="hover:text-main">
              FAQs
            </Link>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-semibold border-l-2 border-main pl-[15px]">
              SUPPORT - SERVICE
            </h3>
            <Link to={"/"} className="hover:text-main">
              Installment purchases
            </Link>
            <Link to={"/"} className="hover:text-main">
              Order lookup
            </Link>
            <Link to={"/"} className="hover:text-main">
              Warranty Policy
            </Link>
            <Link to={"/"} className="hover:text-main">
              Phone warranty service
            </Link>
            <Link to={"/"} className="hover:text-main">
              Payment offers
            </Link>
            <Link to={"/"} className="hover:text-main">
              Online buy guide
            </Link>
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-semibold border-l-2 border-main pl-[15px]">
              PAYMENT METHODS
            </h3>
            <div className="flex flex-wrap gap-2">
              <img
                src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1703168460/ecommerce/logo-visa_lslky0.png"
                alt="logo-visa"
              />
              <img
                src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1703168461/ecommerce/logo-master_qwyvws.png"
                alt="logo-master"
              />
              <img
                src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1703168460/ecommerce/logo-jcb_srlz2u.png"
                alt="logo-jcb"
              />
              <img
                src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1703168460/ecommerce/logo-samsungpay_ghgyci.png"
                alt="logo-samsungpay"
              />
              <img
                src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1703168460/ecommerce/logo-atm_jzxhal.png"
                alt="logo-atm"
              />
              <img
                src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1703168460/ecommerce/logo-vnpay_ktknyp.png"
                alt="logo-vnpay"
              />
            </div>
          </div>
        </div>
      </div>

      {/* footer bottom */}
      <div className="w-ful h-[70px] border-main border-t-2 flex items-center justify-center bg-[#eeeeee]">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[12px] font-normal text-[#666] leading-4">
              © HePhone 2023. All Rights Reserved.
            </span>
          </div>
          <div className="flex-1 flex items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
