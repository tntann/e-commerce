import React, { useState, useEffect, useCallback } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import {
  BreadCrumb,
  Product,
  SearchItem,
  InputSelect,
  Pagination,
  Blogs,
} from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { sorts } from "../../utils/contains";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  const { category } = useParams();

  const fetchProductsByCategory = async (queries) => {
    if (category && category !== "products") queries.category = category;
    const response = await apiGetProducts(queries);
    if (response.success) setProducts(response);
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    let priceQuery = {};
    if (queries.from && queries.to) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    } else {
      if (queries.from) queries.price = { gte: queries.from };
      if (queries.to) queries.price = { lte: queries.to };
    }
    delete queries.from;
    delete queries.to;
    const q = { ...priceQuery, ...queries };
    // console.log(q);
    fetchProductsByCategory(q);
    window.scrollTo(0, 0);
  }, [params]);

  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
  }, [sort]);
  return (
    <div className="w-full">
      {/* breadcrumbs */}
      <div className="h-[81px] flex justify-center items-center bg-[#f7f7f7]">
        <div className="lg:w-main w-screen px-4 lg:px-0 mt-[10px] mb-[10px]">
          <h3 className="mb-[10px] font-semibold uppercase">{category}</h3>
          <BreadCrumb category={category} />
        </div>
      </div>
      {/*end breadcrumbs */}

      {/* Filter */}
      <div className="w-main border p-4 flex lg:pr-4 pr-8 flex-col md:flex-row gap-4 md: justify-between mt-9 m-auto">
        <div className="w-4/5 flex-auto flex flex-col gap-3">
          <span className=" font-semibold text-sm text-[#505050]">
            Filter By
          </span>
          <div className="flex items-center gap-4">
            <SearchItem
              name="price"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="input"
            />
            <SearchItem
              name="color"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            />
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-3">
          <span className=" font-semibold text-sm text-[#505050]">Sort By</span>
          <div className="w-full">
            <InputSelect
              changeValue={changeValue}
              value={sort}
              options={sorts}
            />
          </div>
        </div>
      </div>
      {/*  */}

      <div className="mt-9 lg:w-main sm:w-[500px] px-4 lg:px-0 m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-10px]"
          columnClassName="my-masonry-grid_column"
        >
          {products &&
            products?.products?.map((el) => (
              <Product
                key={el._id}
                pid={el._id}
                productData={el}
                normal={false}
              />
            ))}
        </Masonry>
      </div>

      {/* Pagination */}
      <div className="w-main m-auto my-4 flex justify-end">
        <Pagination totalCount={products?.counts} />
      </div>
      {/* End Pagination */}

      {/* TECHNOLOGY NEWS */}
      <div className="my-8 w-main m-auto">
        <Blogs />
      </div>
    </div>
  );
};

export default Products;
