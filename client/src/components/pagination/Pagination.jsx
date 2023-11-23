import React from "react";
import usePagination from "../../hook/usePagination";
import { PaginationItem } from "../";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, 2);

  const range = () => {
    const currentPage = +params.get("page");
    const pageSize = +import.meta.env.REACT_APP_PRODUCT_LIMIT || 12;
    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalCount);

    return `${start} - ${end}`;
  };
  return (
    <div className="flex w-main justify-between items-center">
      {!+params.get("page") && (
        <span className="text-sm italic">{`Show products 1 - ${
          +import.meta.env.REACT_APP_PRODUCT_LIMIT || 12
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
