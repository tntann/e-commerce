import React from "react";
import { navbar } from "../../utils/contains";
import { NavLink } from "react-router-dom";
import icons from "../../utils/icons";

const { FiSearch } = icons;

const Navbar = () => {
  return (
    <div className="w-main h-12 py-2 border-y text-sm flex items-center justify-between sticky top-0 z-50 bg-white">
      <div className="">
        {navbar.map((el) => (
          <NavLink
            key={el.id}
            to={el.path}
            className={({ isActive }) =>
              isActive
                ? "pr-12 hover:text-main text-main"
                : "pr-12 hover:text-main"
            }
          >
            {el.value}
          </NavLink>
        ))}
      </div>
      <div className="flex justify-center items-cente">
        <input
          type="text"
          name="search"
          placeholder="Search something"
          className="outline-none p-2 w-[250px] h-[39px]"
        />
        <div className="w-[38px] h-[38px] bg-main cursor-pointer rounded-md flex justify-center items-center text-white hover:bg-red-600">
          <FiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
