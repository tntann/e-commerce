import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney, formatPrice } from "../../utils/helper";
import payment from "../../assets/payment.svg";
import { Congrat, InputForm, Paypal } from "../../components";
import { useForm } from "react-hook-form";
import withBaseComponent from "../../hocs/withBaseComponent";
import { getCurrent } from "../../app/user/asyncActions";

const Checkout = ({ dispatch }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [isSuccess, setIsSuccess] = useState(false);

  const address = watch("address");

  useEffect(() => {
    setValue("address", current?.address);
  }, [current.address]);

  useEffect(() => {
    if (isSuccess) dispatch(getCurrent());
  }, [isSuccess]);

  return (
    <div className="p-8 w-full grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6">
      {isSuccess && <Congrat />}
      <div className="w-full flex justify-center items-center col-span-4">
        <img src={payment} alt="payment" className="h-[70%] object-contain" />
      </div>
      <div className="flex w-full flex-col justify-center col-span-6 gap-6">
        <h2 className="text-2xl mb-6 font-bold">CHECK OUT YOUR ORDER</h2>
        <div className="flex w-full gap-6">
          <table className="table-auto flex-1">
            <thead>
              <tr className="border bg-gray-200">
                <th className="p-2 text-left">Products</th>
                <th className="text-center p-2">Quantity</th>
                <th className="text-right p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentCart?.map((el) => (
                <tr className="border" key={el._id}>
                  <td className="text-left p-2">{el.title}</td>
                  <td className="text-center p-2">{el.quantity}</td>
                  <td className="text-right p-2">
                    {formatMoney(formatPrice(el.price)) + " VND"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex-1 flex flex-col justify-between gap-[45px]">
            <div className="flex flex-col gap-6">
              <span className="flex items-center gap-8 text-sm">
                <span className="font-medium">Subtotal:</span>
                <span className="text-main font-bold">{`${formatMoney(
                  formatPrice(
                    currentCart?.reduce(
                      (sum, el) => +el?.price * el.quantity + sum,
                      0
                    )
                  )
                )} VND`}</span>
              </span>
              <InputForm
                label="Your address"
                register={register}
                errors={errors}
                id="address"
                validate={{
                  required: "Please fill out this field.",
                }}
                placeholder="Please fill the address first."
                style="text-sm"
              />
            </div>
            {
              <div className="w-full mx-auto">
                <Paypal
                  payload={{
                    products: currentCart,
                    total: Math.round(
                      +currentCart?.reduce(
                        (sum, el) => +el?.price * el.quantity + sum,
                        0
                      ) / 23500
                    ),
                    address: address,
                  }}
                  setIsSuccess={setIsSuccess}
                  amount={Math.round(
                    +currentCart?.reduce(
                      (sum, el) => +el?.price * el.quantity + sum,
                      0
                    ) / 23500
                  )}
                />
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(Checkout);
