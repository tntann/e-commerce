import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "../../components";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { apiGetProducts } from "../../apis/product";
import useDebounce from "../../hook/useDebounce";
import { useForm } from "react-hook-form";
import moment from "moment";
import { formatMoney, formatPrice } from "../../utils/helper";
import UpdateProduct from "./UpdateProduct";

const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [products, setProducts] = useState(null);
  const [counts, setCounts] = useState(0);

  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);

  const render = useCallback(() => {
    setUpdate(!update);
  });

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({
      ...params,
      limit: +import.meta.env.VITE_APP_LIMIT,
    });
    if (response.success) {
      setCounts(response.counts);
      setProducts(response.products);
      // console.log(response);
    }
  };
  const queryDecounce = useDebounce(watch("q"), 800);
  useEffect(() => {
    if (queryDecounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDecounce }).toString(),
      });
    } else
      navigate({
        pathname: location.pathname,
      });
  }, [queryDecounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
    window.scrollTo(0, 0);
  }, [params, update]);

  // relative
  // absolute
  // fixed
  // diem tua

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-gray-100 z-50">
          <UpdateProduct editProduct={editProduct} render={render} />
        </div>
      )}
      <div className="h-[69px] w-full"></div>
      <div className="bg-white w-full shadow-sm fixed top-0">
        <h1 className="h-[75px] flex justify-between items-center text-xl text-[#374151] font-semibold px-8">
          <span>Manage Products</span>
        </h1>
      </div>
      <div className="flex justify-end items-center px-8">
        <form className="w-[45%]">
          <div className="flex justify-end">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              // fullWidth
              style={"w350"}
              placeholder="Search products buy title, brand...."
            />
          </div>
        </form>
      </div>
      <table className="table-auto mx-8 border">
        <thead className="font-bold bg-[#4e73df] text-[14px] text-white">
          <tr className="border border-white">
            <th className="text-center py-2">ProductCode</th>
            <th className="text-center py-2">Thumb</th>
            <th className="text-center py-2">Title</th>
            <th className="text-center py-2">Brand</th>
            <th className="text-center py-2">Category</th>
            <th className="text-center py-2">Price</th>
            <th className="text-center py-2">Quantity</th>
            <th className="text-center py-2">Sold</th>
            <th className="text-center py-2">Color</th>
            <th className="text-center py-2">Ratings</th>
            <th className="text-center py-2">UpdatedAt</th>
            <th className="text-center py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, idx) => (
            <tr className="border-b" key={el?._id}>
              <td className="text-center py-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  import.meta.env.VITE_APP_LIMIT +
                  idx +
                  1}
              </td>
              <td className="text-center py-2">
                <img
                  src={el?.thumb}
                  alt="thumb"
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="text-center py-2">{el?.title}</td>
              <td className="text-center py-2">{el?.brand}</td>
              <td className="text-center py-2">{el?.category}</td>
              <td className="text-center py-2">{`${formatMoney(
                formatPrice(el?.price)
              )} VND`}</td>
              <td className="text-center py-2">{el?.quantity}</td>
              <td className="text-center py-2">{el?.sold}</td>
              <td className="text-center py-2">{el?.color}</td>
              <td className="text-center py-2">{el?.totalRatings}</td>
              <td className="text-center py-2">
                {moment(el.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="text-center py-2">
                <div className="flex gap-2 items-center justify-center">
                  <button
                    onClick={() => setEditProduct(el)}
                    className="p-2 w-[59px] text-white cursor-pointer border border-[#f4b30d] bg-[#f6c23e] hover:bg-[#f4b619] rounded-md flex items-center justify-center text-sm"
                  >
                    Edit
                  </button>
                  <button className="p-2 w-[59px] text-white cursor-pointer border border-[#d52a1a] bg-[#e74a3b] hover:bg-[#e02d1b] rounded-md flex items-center justify-center text-sm">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8 pl-8 pr-6">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default ManageProducts;
