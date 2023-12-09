import React from "react";
import withBaseComponent from "../../hocs/withBaseComponent";
import { useSelector } from "react-redux";
import { BreadCrumb, Button } from "../../components";
import { formatMoney, formatPrice } from "../../utils/helper";
import OrderItem from "../../components/product/OrderItem";

const DetailCart = ({ location }) => {
  const { current } = useSelector((state) => state.user);
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase">My Cart</h3>
          <BreadCrumb category={location?.pathname} />
        </div>
      </div>
      <div className="flex flex-col border w-main mx-auto my-8">
        <div className="w-main mx-auto bg-gray-200  font-bold py-3 grid grid-cols-10">
          <span className="col-span-6 w-full text-center">Products</span>
          <span className="col-span-1 w-full text-center">Quantity</span>
          <span className="col-span-3 w-full text-center">Price</span>
        </div>
        {current?.cart?.map((el) => (
          <OrderItem key={el._id} el={el} />
        ))}
      </div>
      <div className="w-main mx-auto flex flex-col mb-12 justify-center items-end gap-3">
        <span className="flex items-center gap-8 text-sm">
          <span>Subtotal:</span>
          <span className="text-main text-lg font-bold">{`${formatMoney(
            formatPrice(current?.cart?.reduce((sum, el) => +el?.price + sum, 0))
          )} VND`}</span>
        </span>
        <span className="text-xs italic">
          Shipping, taxes, and discounts calculated at checkout
        </span>
        <Button>CHECK OUT</Button>
      </div>
    </div>
  );
};

export default withBaseComponent(DetailCart);
