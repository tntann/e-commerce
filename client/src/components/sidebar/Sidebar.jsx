import React from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../utils/helper";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.appReducer);
  // console.log(categories);
  return (
    <div className="hidden md:flex flex-col border rounded-lg shadow-md">
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
              : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main hover:bg-slate-50"
          }
        >
          <div className="flex gap-4">
            <img src={el.icon} alt="" className="w-[20px]" />
            {el.title}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
