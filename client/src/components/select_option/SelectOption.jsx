import React from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="w-10 h-10 bg-white rounded-full border shadow-sm flex items-center justify-center hover:bg-gray-300 hover:text-main hover:border-gray-300 cursor-pointer">
      {icon}
    </div>
  );
};

export default SelectOption;
