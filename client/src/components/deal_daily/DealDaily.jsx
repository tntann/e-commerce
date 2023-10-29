import React, { useState, useEffect } from "react";
import icons from "../../utils/icons";
import { apiGetProducts } from "../../apis/product";
import noProduct from "../../assets/no-products-found.png";
import {
  formatMoney,
  renderStartFromNumber,
  secondsToHms,
} from "../../utils/helper";
import { CountDown } from "../";
import moment from "moment";

const { AiFillStar, AiOutlineMenu } = icons;
let idInterval;

const DealDaily = () => {
  const [dealdaily, setDealDaily] = useState([]);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expTime, setExpTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: 6, // Math.round(Math.random() * 10)
      totalRatings: 5,
    });
    if (response.success) {
      setDealDaily(response.products[0]);

      const today = `${moment().format("MM/DD/YYYY")} 7:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      console.log(seconds);
      const number = secondsToHms(seconds);
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    } else {
      setHour(0);
      setMinute(59);
      setSecond(59);
    }
  };

  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expTime]);

  useEffect(() => {
    idInterval = setInterval(() => {
      // console.log("interval");
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpTime(!expTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expTime]);

  return (
    <div className="w-full flex-auto border rounded-lg shadow-md">
      <div className="flex items-center justify-between p-4 w-full">
        <span className="flex-1 flex justify-center">
          <AiFillStar size={20} color="#dd1111" />
        </span>
        <span className="flex-8 font-semibold text-[20px] flex justify-center text-[#505050]">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </div>

      <div className=" w-full flex flex-col items-center pt-0 px-4 gap-2">
        <img
          src={dealdaily?.thumb || noProduct}
          alt="product"
          className="w-full object-contain"
        />
        <span className=" line-clamp-1 font-normal text-center">
          {dealdaily?.title}
        </span>
        <span className="text-main">{`${formatMoney(
          dealdaily?.price
        )} đ`}</span>
        <span className="flex h-4">
          {/* {renderStartFromNumber(productData?.totalRatings)} */}
          {renderStartFromNumber?.(dealdaily?.totalRatings, 20)?.map(
            (star, index) => (
              <span key={index}>{star}</span>
            )
          )}
        </span>
      </div>

      <div className="px-4 mt-8">
        <div className="flex justify-center gap-2 items-center mb-4">
          <CountDown unit={"Hours"} number={hour} />
          <CountDown unit={"Minutes"} number={minute} />
          <CountDown unit={"Seconds"} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-red-400 text-white py-2 rounded"
        >
          <AiOutlineMenu />
          <span>OPTIONS</span>
        </button>
      </div>
    </div>
  );
};

export default DealDaily;
