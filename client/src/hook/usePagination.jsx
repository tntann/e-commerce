/* eslint-disable react/jsx-key */
import { useMemo } from "react";
import { generateRange } from "../utils/helper";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = +import.meta.env.VITE_APP_LIMIT || 12;
    const paginationCount = Math.ceil(+totalProductCount / pageSize);
    const totalPaginationItem = +siblingCount + 5;

    if (paginationCount <= totalPaginationItem)
      return generateRange(1, paginationCount);

    const isShowLeft = currentPage - siblingCount > 2;
    const isShowRight = currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, <HiOutlineDotsHorizontal />, ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, <HiOutlineDotsHorizontal />, paginationCount];
    }

    const siblingLeft = Math.max(currentPage - siblingCount, 1);
    const siblingRight = Math.min(currentPage + siblingCount, paginationCount);

    if (isShowLeft && isShowRight) {
      const midleRange = generateRange(siblingLeft, siblingRight);
      return [
        1,
        <HiOutlineDotsHorizontal />,
        ...midleRange,
        <HiOutlineDotsHorizontal />,
        paginationCount,
      ];
    }
  }, [totalProductCount, currentPage, siblingCount]);

  return paginationArray;
};

export default usePagination;
