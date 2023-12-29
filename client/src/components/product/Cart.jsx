import React from "react";
import { useSelector } from "react-redux";
import withBaseComponent from "../../hocs/withBaseComponent";
import { showCart } from "../../app/appSlice";
import { MdOutlineClose } from "react-icons/md";
import { formatMoney, formatPrice } from "../../utils/helper";
import path from "../../utils/path";
import Button from "../button/Button";
import { apiRemoveCart } from "../../apis";
import { getCurrent } from "../../app/user/asyncActions";
import { toast } from "react-toastify";
import { ImBin } from "react-icons/im";

const Cart = ({ dispatch, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);
  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      toast.success(response.mess);
      dispatch(getCurrent());
    } else toast.error(response.mess);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[400px] h-screen bg-[#1c1d1d] grid grid-rows-10 text-white p-6"
    >
      <header className="border-b border-gray-500 flex justify-between items-center row-span-1 h-full font-bold text-2xl">
        <span className="mb-4 font-semibold">Your Cart</span>
        <span
          onClick={() => dispatch(showCart())}
          className="p-2 mb-5 cursor-pointer hover:text-main"
        >
          <MdOutlineClose size={24} />
        </span>
      </header>
      <section className="row-span-7 flex flex-col gap-3 h-full max-h-full overflow-y-auto py-3">
        {!currentCart && (
          <span className="text-xs italic">Your cart is empty.</span>
        )}
        {currentCart &&
          currentCart?.map((el) => (
            <div key={el?._id} className="flex justify-between items-center">
              <div className="flex gap-4 mb-4">
                <img
                  src={el?.thumbnail}
                  alt="thumb"
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-base text-main">{el?.title}</span>
                  <span className="text-[11px]">{el?.color}</span>
                  <span className="text-[11px]">{`Quantity: ${el?.quantity}`}</span>
                  <span className="text-sm">
                    {`${formatMoney(formatPrice(el?.price))} VND`}
                  </span>
                </div>
              </div>
              <span
                onClick={() => removeCart(el.product?._id, el.color)}
                className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-700 cursor-pointer hover:text-main"
              >
                <ImBin size={16} />
              </span>
            </div>
          ))}
      </section>
      <div className="row-span-2 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-[#bbbcbc] font-semibold">TOTAL</span>
          <span className="text-[#bbbcbc] font-semibold">
            {formatMoney(
              formatPrice(
                currentCart?.reduce(
                  (sum, el) => sum + Number(el.price) * el.quantity,
                  0
                )
              )
            ) + " VND"}
          </span>
        </div>
        <span className="text-center text-[#bbbcbc] italic text-xs">
          Shipping, taxes, and discounts calculated at checkout.
        </span>
        <Button
          handleOnClick={() => {
            dispatch(showCart());
            navigate(`/${path.DETAIL_CART}`);
            // navigate(`/${path.USER}/${path.DETAIL_CART}`)
          }}
          style="rounded-none w-full bg-main py-3 hover:bg-red-700"
        >
          Shopping Cart
        </Button>
      </div>
    </div>
  );
};

export default withBaseComponent(Cart);
