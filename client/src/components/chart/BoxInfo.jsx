import React from "react";
import clsx from "clsx";

const BoxInfo = ({ className, icon, text, number = 0 }) => {
  return (
    <div
      className={clsx(
        "p-4 w-full flex items-center justify-between border",
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="uppercase text-xs">{text}</span>
        <span className="text-2xl font-semibold">{number}</span>
      </div>
      <span>{icon}</span>
    </div>
  );
};

export default BoxInfo;
