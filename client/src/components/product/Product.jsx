import React, { useState } from "react";
import noProduct from "../../assets/no-products-found.png";
import labelnew from "../../assets/new.png";
import Trend from "../../assets/Trending.png";
import {
  formatMoney,
  renderStartFromNumber,
  formatPrice,
} from "../../utils/helper";
import { SelectOption } from "../";
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
import withBaseComponent from "../../hocs/withBaseComponent";
import { showModal } from "../../app/appSlice";
import { ProductDetail } from "../../pages/public";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { apiUpdateCart } from "../../apis";
import { toast } from "react-toastify";
import { getCurrent } from "../../app/user/asyncActions";
import path from "../../utils/path";
import { BsFillCartCheckFill } from "react-icons/bs";

const { FiHeart, AiOutlineShoppingCart, AiOutlineEye } = icons;

const Product = ({ productData, isNew, normal, navigate, dispatch }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const { current } = useSelector((state) => state.user);

  const handleClickOptions = async (e, flag) => {
    e.stopPropagation();
    if (flag === "CART") {
      if (!current)
        return Swal.fire({
          title: "Almost...",
          text: "Please login!",
          icon: "info",
          cancelButtonText: "Not now!",
          showCancelButton: true,
          confirmButtonText: "Go login page",
        }).then((rs) => {
          if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
        });
      const response = await apiUpdateCart({
        pid: productData?._id,
        color: productData?.color,
        quantity: 1,
        price: productData?.price,
        thumbnail: productData?.thumb,
        title: productData?.title,
      });
      if (response.success) {
        toast.success(response.mess);
        dispatch(getCurrent());
      } else toast.error(response.mess);
    }
    if (flag === "WISHLIST") console.log("WISHLIST");
    if (flag === "QUICK_VIEW") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <ProductDetail
              data={{ pid: productData?._id, category: productData?.category }}
              isQuickView
            />
          ),
        })
      );
    }
  };

  return (
    <div className="w-full text-base px-[10px] ">
      <div
        className="w-full border p-[15px] flex flex-col items-center shadow-sm rounded-lg"
        onClick={() =>
          navigate(
            `/${productData?.category?.toLowerCase()}/${productData?._id}/${
              productData?.title
            }`
          )
        }
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative ">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-5 animate-slide-top">
              <span
                title="Quick view"
                onClick={(e) => handleClickOptions(e, "QUICK_VIEW")}
              >
                <SelectOption icon={<AiOutlineEye />} />
              </span>
              {current?.cart?.some(
                (el) => el.product === productData._id.toString()
              ) ? (
                <span title="Added to Cart">
                  <SelectOption icon={<BsFillCartCheckFill color="green" />} />
                </span>
              ) : (
                <span
                  title="Add to Cart"
                  onClick={(e) => handleClickOptions(e, "CART")}
                >
                  <SelectOption icon={<AiOutlineShoppingCart />} />
                </span>
              )}
              <span
                title="Add to Wishlist"
                onClick={(e) => handleClickOptions(e, "WISHLIST")}
              >
                <SelectOption icon={<FiHeart />} />
              </span>
            </div>
          )}
          <div className="border-none outline-none">
            <img
              src={productData?.thumb || noProduct}
              alt="product"
              className="w-[243px] h-[243px] object-cover cursor-pointer"
            />
          </div>
          {!normal && (
            <img
              src={isNew ? labelnew : Trend}
              alt=""
              className=" absolute top-0 right-0 w-[75px] h-[25px] object-contain"
            />
          )}
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <Link
            to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${
              productData?.title
            }`}
            className=" line-clamp-1 font-normal"
          >
            {productData?.title}
          </Link>
          <span className="text-main">
            {" "}
            {`${formatMoney(formatPrice(productData?.price))} VND`}
          </span>
          <span className="flex h-4">
            {/* {renderStartFromNumber(productData?.totalRatings)} */}
            {productData?.totalRatings &&
              renderStartFromNumber(productData?.totalRatings).map(
                (star, index) => <span key={index}>{star}</span>
              )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default withBaseComponent(Product);
