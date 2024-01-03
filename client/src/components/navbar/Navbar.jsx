import React, { useEffect, useState } from "react";
import { navbar } from "../../utils/contains";
import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
// import icons from "../../utils/icons";
import { useForm } from "react-hook-form";
import path from "../../utils/path";
import InputForm from "../input/InputForm";
import { IoMenuSharp } from "react-icons/io5";

// const { FiSearch } = icons;

const Navbar = () => {
  const {
    register,
    formState: { errors, isDirty },
    watch,
  } = useForm();
  const q = watch("q");
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.keyCode === 13) {
        navigate({
          pathname: `/${path.PRODUCTS}`,
          search: createSearchParams({ q }).toString(),
        });
      }
    };
    if (isDirty) window.addEventListener("keyup", handleEnter);
    else window.removeEventListener("keyup", handleEnter);

    return () => {
      window.removeEventListener("keyup", handleEnter);
    };
  }, [isDirty, q]);
  return (
    <div className="md:w-main w-full h-12 flex items-center px-4 md:px-0 justify-between border-y lg:sticky lg:top-0 lg:z-40 lg:bg-white">
      {showMenu && (
        <div
          onClick={() => setShowMenu(false)}
          className="absolute inset-0 z-[50] bg-overlay"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-4/5 bg-white p-4 h-full flex flex-col"
          >
            {navbar.map((el) => (
              <NavLink
                to={el.path}
                key={el.id}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  isActive
                    ? "py-3 border-b text-sm hover:text-main text-main"
                    : "py-3 border-b text-sm hover:text-main"
                }
              >
                {el.value}
              </NavLink>
            ))}
          </div>
        </div>
      )}
      <span
        onClick={() => setShowMenu(true)}
        className="md:pr-12 pr-6 text-sm md:hidden hover:text-main"
      >
        <IoMenuSharp size={20} />
      </span>
      <div className="py-2 flex-auto text-sm hidden md:flex items-center">
        {navbar.map((el) => (
          <NavLink
            to={el.path}
            key={el.id}
            className={({ isActive }) =>
              isActive
                ? "md:pr-12 pr-6 text-sm hover:text-main text-main"
                : "md:pr-12 pr-6 text-sm hover:text-main"
            }
          >
            {el.value}
          </NavLink>
        ))}
      </div>
      <InputForm
        id="q"
        register={register}
        errors={errors}
        placeholder="Search something..."
        style="flex-none border-none outline-none text-sm"
      />
    </div>
  );
};

export default Navbar;
