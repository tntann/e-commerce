import React from "react";
import { CgSpinner } from "react-icons/cg";

const Button = ({
  name,
  children,
  handleOnClick,
  style,
  fw,
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      className={
        style
          ? style
          : `p-3 my-2 rounded-md text-white bg-main flex items-center justify-center font-semibold hover:bg-red-600 focus:outline-none focus:bg-red-600 ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      {disabled && (
        <span className="animate-spin">
          <CgSpinner size={18} />
        </span>
      )}
      {children}
      <span>{name}</span>
    </button>
  );
};

export default Button;
