import React from "react";

const Button = ({ name, children, handleOnClick, style, fw }) => {
  return (
    <button
      type="button"
      className={
        style
          ? style
          : `p-3 my-2 rounded-md text-white bg-main font-semibold hover:bg-red-600 focus:outline-none focus:bg-red-600 ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {children}
      <span>{name}</span>
    </button>
  );
};

export default Button;
