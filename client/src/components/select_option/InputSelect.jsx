import React from "react";

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <select
      className="outline-none w-full h-[42px] p-2 text-[13px] text-gray-500 leading-7 border border-gray-700"
      value={value}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value="">Featured</option>
      {options?.map((el) => (
        <option key={el.id} value={el.value}>
          {el.text}
        </option>
      ))}
    </select>
  );
};

export default InputSelect;
