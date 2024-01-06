import React, { Fragment, useState } from "react";
import logo from "../../assets/hephonelogo1.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { adminSidebar } from "../../utils/contains";
import clsx from "clsx";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import withBaseComponent from "../../hocs/withBaseComponent";

const activedStyle =
  "px-4 py-2 flex items-center gap-2 bg-[#4e73df] text-gray-100";
const notActivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-[#34406b]";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID))
      setActived((prev) => prev.filter((el) => el !== tabID));
    else setActived((prev) => [...prev, tabID]);
  };

  return (
    <div className="bg-[#2a3041] h-full py-4 shadow-sm text-white w-[256px] min-h-screen">
      <Link
        to={"/"}
        className="flex flex-col justify-center items-center p-4 gap-2"
      >
        <img
          src={logo}
          alt="logo"
          className="w-[200px] object-contain items-center"
        />
        <small className=" text-white">HEPHONE - ADMIN</small>
      </Link>

      <div>
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActivedStyle)
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div
                onClick={() => handleShowTabs(+el.id)}
                className="flex flex-col"
              >
                <div className="flex items-center justify-between px-4 py-2 hover:bg-[#34406b] cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === el.id) ? (
                    <AiOutlineDown />
                  ) : (
                    <AiOutlineRight />
                  )}
                </div>
                {actived.some((id) => +id === +el.id) && (
                  <div className="flex flex-col">
                    {el.submenu.map((item, idx) => (
                      <NavLink
                        key={idx}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && notActivedStyle,
                            "pl-14"
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
        <div onClick={() => navigate(`/`)} className={notActivedStyle}>
          <span>
            <RiShareForwardLine size={19} />
          </span>
          <span>Go Homepage</span>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(AdminSidebar);
