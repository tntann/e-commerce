import React, { useCallback, useEffect, useState } from "react";
import useDebounce from "../../hook/useDebounce";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  apiDeleteOrderByAdmin,
  apiGetOrders,
  // apiUpdateCart,
  apiUpdateStatus,
} from "../../apis";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Button, Pagination } from "../../components";
import { formatMoney, formatPrice } from "../../utils/helper";
import moment from "moment";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const {
    register,
    // formState: { errors },
    watch,
    setValue,
  } = useForm();
  const [orders, setOrders] = useState();
  const [counts, setCounts] = useState(0);
  const [update, setUpdate] = useState(false);
  const [editOrder, setEditOrder] = useState();
  const fetchOrders = async (params) => {
    const response = await apiGetOrders({
      ...params,
      limit: import.meta.env.VITE_APP_LIMIT,
    });
    if (response.success) {
      setCounts(response.counts);
      setOrders(response.orders);
    }
  };
  const render = useCallback(() => {
    setUpdate(!update);
  });
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
    fetchOrders(searchParams);
  }, [params, update]);
  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure remove this order",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteOrderByAdmin(id);
        if (response.success) toast.success(response.mess);
        else toast.error(response.mess);
        render();
      }
    });
  };
  const handleUpdate = async () => {
    const response = await apiUpdateStatus(editOrder._id, {
      status: watch("status"),
    });
    if (response.success) {
      toast.success(response.mess);
      setUpdate(!update);
      setEditOrder(null);
    } else toast.error(response.mess);
  };
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="bg-white border-b w-full flex items-center shadow-sm fixed top-0">
        <h1 className="h-[75px] flex justify-between items-center text-xl text-[#374151] font-semibold px-8">
          Manage orders
        </h1>
        {editOrder && (
          <>
            <Button
              handleOnClick={handleUpdate}
              style="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mx-6"
            >
              Update
            </Button>
            <Button
              style="bg-main hover:bg-red-600 text-white px-4 py-2 rounded-md mx-6"
              handleOnClick={() => setEditOrder(null)}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
      {/* <div className="flex justify-end bg-gray-50 items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search products by title, description,..."
          />
        </form>
      </div> */}
      <div className="px-4 mt-6 w-full">
        <table className="table-auto w-full px-4 border">
          <thead>
            <tr className="border bg-[#4e73df] text-white border-gray-500">
              <th className="text-center py-2">#</th>
              <th className="text-center py-2">Ordered By</th>
              <th className="text-center py-2">Products</th>
              <th className="text-center py-2">Total</th>
              <th className="text-center py-2">Status</th>
              <th className="text-center py-2">Ordered Date</th>
              <th className="text-center py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((el, idx) => (
              <tr className="border-b" key={el._id}>
                <td className="text-center py-2">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    import.meta.env.VITE_APP_LIMIT +
                    idx +
                    1}
                </td>
                <td className="text-center py-2">
                  {el.orderBy?.firstname + " " + el.orderBy?.lastname}
                </td>
                <td className="text-center max-w-[400px] py-2">
                  <span className="grid grid-cols-3 gap-4">
                    {el.products?.map((n) => (
                      <span
                        key={n._id}
                        className="flex col-span-1 items-center gap-2"
                      >
                        <img
                          src={n.thumbnail}
                          alt=""
                          className="w-12 h-12 object-cover border"
                        />
                        <span className="flex text-xs flex-col items-start gap-1">
                          <h3 className="font-semibold text-red-500">
                            {n.title}
                          </h3>
                          <span>{n.color}</span>
                          <span>{formatMoney(formatPrice(n.price))}</span>
                          <span>{n.quantity + " items"}</span>
                        </span>
                      </span>
                    ))}
                  </span>
                </td>
                <td className="text-center py-2">
                  {formatMoney(formatPrice(el.total * 24230)) + " VND"}
                </td>
                <td className="text-center py-2">
                  {editOrder?._id === el._id ? (
                    <select {...register("status")} className="form-select">
                      <option value="Canceled">Canceled</option>
                      <option value="Pending">Pending</option>
                      <option value="Succeed">Succeed</option>
                    </select>
                  ) : (
                    el.status
                  )}
                </td>
                <td className="text-center py-2">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="text-center py-2">
                  <span
                    onClick={() => {
                      setEditOrder(el);
                      setValue("status", el.status);
                    }}
                    className="text-[#f6c23e] hover:text-[#f4b619] inline-block hover:underline cursor-pointer px-1"
                  >
                    <BiEdit size={22} />
                  </span>
                  <span
                    onClick={() => handleDeleteProduct(el._id)}
                    className="text-[#e74a3b] hover:text-[#e02d1b] inline-block hover:underline cursor-pointer px-1"
                  >
                    <RiDeleteBin6Line size={22} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex px-4 justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default ManageOrder;
