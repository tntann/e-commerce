import React, { memo } from "react";

const CountDown = ({ unit, number }) => {
  return (
    <div className="w-[30%] h-[60px] flex items-center justify-center bg-[#f4f4f4] rounded-md flex-col">
      <span className="text-[18px] text-gray-800">{number}</span>
      <span className="text-xs text-gray-600">{unit}</span>
    </div>
  );
};

export default memo(CountDown);
