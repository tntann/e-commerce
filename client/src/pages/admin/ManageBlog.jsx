import React from "react";

const ManageBlog = () => {
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="bg-white border-b w-full flex items-center shadow-sm fixed top-0 ">
        <h1 className="h-[75px] flex justify-between items-center text-xl text-[#374151] font-semibold px-8">
          Manage Blogs
        </h1>
      </div>
    </div>
  );
};

export default ManageBlog;
