import React from "react";
import clsx from "clsx";

const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col h-[78px] gap-2">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          "border border-gray-400 p-2 my-auto rounded focus:border-main focus:outline-none",
          fullWidth && "w-full"
        )}
        defaultValue={defaultValue}
      />
      {errors[id] && (
        <small className="text-xs text-main">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default InputForm;
