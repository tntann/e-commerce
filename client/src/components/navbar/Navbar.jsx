import React, { useEffect } from "react";
import { navbar } from "../../utils/contains";
import { NavLink, createSearchParams, useNavigate } from "react-router-dom";
// import icons from "../../utils/icons";
import { useForm } from "react-hook-form";
import path from "../../utils/path";
import InputForm from "../input/InputForm";

// const { FiSearch } = icons;

const Navbar = () => {
  const {
    register,
    formState: { errors, isDirty },
    watch,
  } = useForm();
  const q = watch("q");
  const navigate = useNavigate();
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
    <div className="w-main h-[48px] flex items-center justify-between border-y">
      <div className="py-2 flex-auto text-sm flex items-center">
        {navbar.map((el) => (
          <NavLink
            to={el.path}
            key={el.id}
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
      <InputForm
        id="q"
        register={register}
        errors={errors}
        placeholder="Search something..."
        style="flex-none border-none outline-none"
      />
    </div>
  );
};

export default Navbar;
