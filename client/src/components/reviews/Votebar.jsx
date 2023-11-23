import React, { useRef, useEffect } from "react";
import icons from "../../utils/icons";

const { AiFillStar } = icons;

const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const progressRef = useRef();

  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
    progressRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCount, ratingTotal]);

  return (
    <div className=" flex items-center gap-2 text-sm text-gray-800">
      <div className="flex w-[10%] items-center gap-1 text-sm">
        <div className=" flex items-center gap-[2px]">
          <span className="w-[10px] flex justify-center items-center">
            {number}
          </span>
          <AiFillStar color="#ffce3d" />
        </div>
      </div>

      <div className="w-[75%]">
        <div className=" relative w-full h-2 bg-[#ededed] rounded-full">
          <div
            ref={progressRef}
            className=" absolute inset-0 bg-main rounded-full"
          ></div>
        </div>
      </div>

      <div className="w-[15%] flex justify-end text-xs text-gray-500">{`${
        ratingCount || 0
      } reviews`}</div>
    </div>
  );
};

export default Votebar;
