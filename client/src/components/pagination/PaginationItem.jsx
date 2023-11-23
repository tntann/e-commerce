import React from "react";
import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  useParams,
  createSearchParams,
} from "react-router-dom";

const PaginationItem = ({ children }) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [params] = useSearchParams();

  const handlePagination = () => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(children)) queries.page = children;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });

    console.log(queries);
  };
  return (
    <button
      className={clsx(
        "w-10 h-10 text-gray-700 flex justify-center border mr-2 rounded-md",
        !Number(children) && "items-end pb-[6px]",
        Number(children) && "items-center hover:text-main hover:bg-gray-300",
        +params.get("page") === +children && "bg-main text-white",
        !+params.get("page") && +children === 1 && "bg-main text-white"
      )}
      onClick={handlePagination}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default PaginationItem;
