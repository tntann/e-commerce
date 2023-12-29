import React, { useEffect, useState } from "react";
import { apiGetUserOrders } from "../../apis";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputForm, Pagination } from "../../components";
import moment from "moment";
import withBaseComponent from "../../hocs/withBaseComponent";
import CustomSelect from "../../components/select_option/CustomSelect";
import { statusOrders } from "../../utils/contains";
import { formatMoney, formatPrice } from "../../utils/helper";

const History = ({ navigate, location }) => {
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    watch,
    // setValue,
  } = useForm();
  // const q = watch("q");
  const status = watch("status");
  const fetchPOrders = async (params) => {
    const response = await apiGetUserOrders({
      ...params,
      limit: import.meta.env.VITE_APP_LIMIT,
    });
    if (response.success) {
      setOrders(response.orders);
      setCounts(response.counts);
    }
  };
  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchPOrders(pr);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  return (
    <div className="w-full relative px-4">
      <header className="text-2xl text-gray-700 font-semibold py-4 border-b border-b-blue-200">
        Purchase History
      </header>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%] grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <InputForm
              id="q"
              register={register}
              errors={errors}
              fullWidth
              placeholder="Search orders by status,..."
            />
          </div>
          <div className="col-span-1 flex items-center">
            <CustomSelect
              options={statusOrders}
              value={status}
              onChange={(val) => handleSearchStatus(val)}
              wrapClassname="w-full"
            />
          </div>
        </form>
      </div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="border bg-main text-white border-gray-100">
            <th className="text-center py-2">#</th>
            <th className="text-center py-2">Products</th>
            <th className="text-center py-2">Total</th>
            <th className="text-center py-2">Status</th>
            <th className="text-center py-2">Order Date</th>
            {/* <th className="text-center py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, idx) => (
            <tr className="border-b" key={el?._id}>
              <td className="text-center p-2">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  import.meta.env.VITE_APP_LIMIT +
                  idx +
                  1}
              </td>
              <td className="text-center max-w-[400px] py-2">
                <span className="grid grid-cols-3 gap-4">
                  {el.products?.map((item) => (
                    <span
                      className="flex col-span-1 items-center gap-2"
                      key={item._id}
                    >
                      <img
                        src={item.thumbnail}
                        alt="thumb"
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <span className="flex flex-col">
                        <span className="text-main text-xs text-start">
                          {item.title}
                        </span>
                        <span className="flex items-center text-xs gap-2">
                          <span>Quantity:</span>
                          <span className="text-main">{item.quantity}</span>
                        </span>
                      </span>
                    </span>
                  ))}
                </span>
              </td>
              <td className="text-center py-2">
                {formatMoney(formatPrice(el.total * 24230)) + " VND"}
              </td>
              <td className="text-center py-2">{el.status}</td>
              <td className="text-center py-2">
                {moment(el.createdAt)?.format("lll")}
              </td>
              <td className="text-center py-2">
                {/* <span
                  onClick={() => setEditProduct(el)}
                  className="text-blue-500 hover:text-orange-500 inline-block hover:underline cursor-pointer px-1"
                >
                  <BiEdit size={20} />
                </span>
                <span
                  onClick={() => handleDeleteProduct(el._id)}
                  className="text-blue-500 hover:text-orange-500 inline-block hover:underline cursor-pointer px-1"
                >
                  <RiDeleteBin6Line size={20} />
                </span>
                <span
                  onClick={() => setCustomizeVarriant(el)}
                  className="text-blue-500 hover:text-orange-500 inline-block hover:underline cursor-pointer px-1"
                >
                  <BiCustomize size={20} />
                </span> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default withBaseComponent(History);
