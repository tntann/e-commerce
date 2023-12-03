import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { colors } from "../../utils/contains";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "../../apis";
import useDebounce from "../../hook/useDebounce";

const { AiOutlineDown } = icons;

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setSelected] = useState([]);
  const [params] = useSearchParams();
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const [bestPrice, setBestPrice] = useState(null);
  const handleSelect = (e) => {
    // console.log(e.target.value);
    const alreadyEl = selected?.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };
  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: "1" });
    if (response.success) setBestPrice(response.products[0]?.price);
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (selected.length > 0) {
      queries.color = selected.join(",");
      queries.page = 1;
    } else delete queries.color;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);

  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);

  useEffect(() => {
    if (price.from && price.to && price.from > price.to)
      alert("From price cannot be greater than To price");
  }, [price]);

  const debouncePriceFrom = useDebounce(price.from, 1000);
  const debouncePriceTo = useDebounce(price.to, 1000);

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(price.from) > 0) queries.from = price.from;
    else delete queries.from;
    if (Number(price.to) > 0) queries.to = price.to;
    else delete queries.to;
    queries.page = 1;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);
  return (
    <div
      className="p-3 text-gray-500 text-xs gap-6 relative border border-gray-700 flex justify-between items-center"
      onClick={() => changeActiveFilter(name)}
    >
      <div className="flex items-center gap-6 cursor-pointer">
        <span className=" capitalize">{name}</span>
        <AiOutlineDown />
      </div>
      {activeClick === name && (
        <div className=" absolute top-[calc(100%+4px)] left-[-1px] w-fit p-4 border bg-white min-w-[200px] z-10">
          {/* filter color */}
          {type === "checkbox" && (
            <div onClick={(e) => e.stopPropagation()} className="">
              <div className="items-center text-sm justify-between flex gap-8 mb-4">
                <span className=" whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                    changeActiveFilter(null);
                  }}
                  className=" cursor-pointer underline hover:text-main"
                >
                  Reset
                </span>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-3"
              >
                {colors?.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      className=" cursor-pointer"
                      type="checkbox"
                      value={el}
                      onChange={handleSelect}
                      id={el}
                      checked={selected?.some(
                        (selectedItem) => selectedItem === el
                      )}
                    />
                    <label
                      className=" capitalize text-sm text-gray-700"
                      htmlFor={el}
                    >
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* filter price */}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="items-center text-sm justify-between flex gap-8 mb-4">
                <span className=" whitespace-nowrap">{`The highest price is ${Number(
                  bestPrice
                ).toLocaleString()} VND`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({ from: "", to: "" });
                    changeActiveFilter(null);
                  }}
                  className=" cursor-pointer underline hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                    className="p-4 text-sm border border-gray-500 outline-none w-[150px] h-10"
                    type="number"
                    id="from"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                    className="p-4 text-sm border border-gray-500 outline-none w-[150px] h-10"
                    type="number"
                    id="to"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchItem;
