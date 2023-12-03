import React from "react";
import usePagination from "../../hook/usePagination";
import { PaginationItem } from "../";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, params.get("page") || 1);

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +import.meta.env.VITE_APP_LIMIT || 12;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };
  return (
    <div className="flex w-full justify-between items-center">
      {!+params.get("page") && (
        <span className="text-sm italic">{`Show products 1 - ${
          Math.min(+import.meta.env.VITE_APP_LIMIT, totalCount) || 12
        } of ${totalCount}`}</span>
      )}
      {+params.get("page") && (
        <span className="text-sm italic">{`Show products ${range()} of ${totalCount}`}</span>
      )}
      <div className="flex items-center">
        {pagination?.map((el) => (
          <PaginationItem key={el}>{el}</PaginationItem>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
