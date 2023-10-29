import React from "react";
import { navbar } from "../../utils/contains";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-main h-12 py-2 border-y mb-6 text-sm flex items-center">
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
  );
};

export default Navbar;
