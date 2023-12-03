import React from "react";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className=" flex items-center justify-center">
      <MoonLoader color="#ee3131" />;
    </div>
  );
};

export default Loading;
