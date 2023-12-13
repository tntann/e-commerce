import React from "react";
import icons from "../../utils/icons";
import { BiCertification } from "react-icons/bi";

const Services = () => {
  const { BsShieldShaded, ImTruck, AiFillGift, FaReply, FaTty } = icons;
  return (
    <section className="pb-12 pt-36  lg:pb-[90px] lg:pt-[36px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-12">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Our Services
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark  sm:text-4xl md:text-[40px] text-gray-800">
                What We Offer
              </h2>
            </div>
          </div>
        </div>

        <div className="-mx-4 w-main flex flex-wrap cursor-pointer">
          <ServiceCard
            title="Guarantee"
            details="Quality Checked"
            icon={<BsShieldShaded size={45} />}
          />
          <ServiceCard
            title="Free Shipping"
            details="Free On All Products"
            icon={<ImTruck size={45} />}
          />
          <ServiceCard
            title="Special Gift Cards"
            details="Special Gift Cards"
            icon={<AiFillGift size={45} />}
          />
          <ServiceCard
            title="Free Return"
            details="Within 7 Days"
            icon={<FaReply size={45} />}
          />
          <ServiceCard
            title="Consultancy"
            details="Lifetime 24/7/356"
            icon={<FaTty size={45} />}
          />
          <ServiceCard
            title="Quality certification"
            details="Genuine product"
            icon={<BiCertification size={45} />}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;

const ServiceCard = ({ icon, title, details }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-9 rounded-[20px] p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10">
          <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-primary text-main">
            {icon}
          </div>
          <h4 className="mb-[14px] text-2xl font-semibold text-gray-800 ">
            {title}
          </h4>
          <p className="text-body-color ">{details}</p>
        </div>
      </div>
    </>
  );
};
