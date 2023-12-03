import React from "react";
import clsx from "clsx";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  style,
  fullWidth,
  placeholder,
  isHideLabel,
}) => {
  const isInvalidFieldsArray = Array.isArray(invalidFields);
  return (
    <div className={clsx("relative mb-2", fullWidth && "w-full")}>
      {!isHideLabel && value?.trim() !== "" && (
        <label
          className="text-[13px] absolute animate-slide-top-sm top-0 left-[12px] block bg-white px-1"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        className={clsx(
          "placeholder:text-sm placeholder:italic p-3 mt-2 w-full rounded-md border border-gray-300 focus:border-main focus:outline-none",
          style
        )}
        placeholder={
          placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {isInvalidFieldsArray &&
        invalidFields.some((el) => el.name === nameKey) && (
          <small className="text-[#fd475a] italic">
            {invalidFields.find((el) => el.name === nameKey)?.mess}
          </small>
        )}
    </div>
  );
};

export default InputField;
