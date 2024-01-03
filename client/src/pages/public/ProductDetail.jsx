import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, createSearchParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts, apiUpdateCart } from "../../apis";
import {
  BreadCrumb,
  Button,
  SelectQuantity,
  ProductExtrainfo,
  ProductInfoTab,
  CustomSlider2,
} from "../../components";
import Slider from "react-slick";
import {
  formatMoney,
  formatPrice,
  renderStartFromNumber,
} from "../../utils/helper";
import { productExtrainfo } from "../../utils/contains";
import DOMPurify from "dompurify";
import clsx from "clsx";
import path from "../../utils/path";
import { toast } from "react-toastify";
import { getCurrent } from "../../app/user/asyncActions";
import withBaseComponent from "../../hocs/withBaseComponent";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

const ProductDetail = ({ isQuickView, data, location, dispatch, navigate }) => {
  const titleRef = useRef();
  const params = useParams();
  const { current } = useSelector((state) => state.user);

  const [product, setProduct] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [varriant, setVarriant] = useState(null);
  const [pid, setPid] = useState(null);
  const [category, setCategory] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    thumb: "",
    images: [],
    price: "",
    color: "",
  });

  useEffect(() => {
    if (data) {
      setPid(data.pid);
      setCategory(data.category);
    } else if (params && params.pid) {
      setPid(params.pid);
      setCategory(params.category);
    }
  }, [data, params]);

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setCurrentImage(response.productData?.thumb);
    }
  };

  useEffect(() => {
    if (varriant) {
      setCurrentProduct({
        title: product?.varriants?.find((el) => el.sku === varriant)?.title,
        color: product?.varriants?.find((el) => el.sku === varriant)?.color,
        images: product?.varriants?.find((el) => el.sku === varriant)?.images,
        price: product?.varriants?.find((el) => el.sku === varriant)?.price,
        thumb: product?.varriants?.find((el) => el.sku === varriant)?.thumb,
      });
    } else {
      setCurrentProduct({
        title: product?.title,
        color: product?.color,
        images: product?.images || [],
        price: product?.price,
        thumb: product?.thumb,
      });
    }
  }, [varriant, product]);

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response.success) setRelatedProducts(response.products);
  };

  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    titleRef?.current?.scrollIntoView({ block: "center" });
  }, [pid]);

  useEffect(() => {
    if (pid) fetchProductData();
  }, [update]);

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else {
        setQuantity(number);
      }
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );

  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };

  const handleAddToCart = async () => {
    if (!current)
      return Swal.fire({
        title: "Almost...",
        text: "Please login first!",
        icon: "info",
        cancelButtonText: "Not now!",
        showCancelButton: true,
        confirmButtonText: "Go login page",
      }).then(async (rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
      });
    const response = await apiUpdateCart({
      pid,
      color: currentProduct.color || product?.color,
      quantity,
      price: currentProduct.price || product.price,
      thumbnail: currentProduct.thumb || product.thumb,
      title: currentProduct.title || product.title,
    });
    if (response.success) {
      toast.success(response.mess);
      dispatch(getCurrent());
    } else toast.error(response.mess);
  };
  return (
    <div className={clsx("w-full")}>
      {/* breadcrumbs */}
      {!isQuickView && (
        <div className="h-[81px] flex justify-center items-center bg-[#f7f7f7]">
          <div ref={titleRef} className="w-main mt-[10px] mb-[10px]">
            <h3 className="mb-[10px] font-semibold">
              {currentProduct?.title || product?.title}
            </h3>
            <BreadCrumb
              title={currentProduct?.title || product?.title}
              category={category}
            />
          </div>
        </div>
      )}
      {/*end breadcrumbs */}

      <div
        ref={titleRef}
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "bg-white m-auto mt-5 flex",
          isQuickView
            ? "w-[1040px] gap-24 p-8 max-h-[80vh] overflow-y-auto rounded-lg"
            : "w-main"
        )}
      >
        {/* Image */}
        <div
          className={clsx(
            "flex flex-col gap-[30px] w-2/5",
            isQuickView && "w-1/2"
          )}
        >
          <div className="w-[458px] ">
            <img
              src={currentProduct.thumb || currentImage}
              alt="product"
              className="w-[458px] h-[458px] border border-gray-300 flex object-contain rounded-lg"
            />
          </div>
          <div className="w-[458px]">
            <Slider {...settings}>
              {currentProduct?.images?.length === 0 &&
                currentProduct?.images?.map((el, index) => (
                  <div key={index} className="border-none outline-none flex-1">
                    <img
                      onClick={(e) => handleClickImage(e, el)}
                      src={el}
                      alt="sub-product"
                      className="w-[143px] h-[143px] cursor-pointer border border-gray-300 hover:border-main object-contain rounded-lg"
                    />
                  </div>
                ))}

              {currentProduct?.images?.length > 0 &&
                currentProduct?.images?.map((el, index) => (
                  <div key={index} className="border-none outline-none flex-1">
                    <img
                      onClick={(e) => handleClickImage(e, el)}
                      src={el}
                      alt="sub-product"
                      className="w-[143px] h-[143px] cursor-pointer border border-gray-300 hover:border-main object-contain rounded-lg"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        {/* End Images */}

        {/* Depcriptions */}
        <div
          className={clsx(
            "w-2/5 pr-[24px] flex flex-col gap-4",
            isQuickView && "w-1/2"
          )}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] text-main leading-[35px] font-semibold">
              {`${formatMoney(
                formatPrice(currentProduct?.price || product?.price)
              )} VND`}
            </h2>
            {/* <span className="text-sm text-main">{`Quantity:${product?.quantity}`}</span> */}
          </div>
          <div className="flex items-center gap-1">
            {renderStartFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            {/* <span className="text-sm text-main italic">{`Sold:${product?.sold}`}</span> */}
          </div>
          <ul className="list-square text-sm text-[#505050] pl-[18px]">
            {product?.description?.length > 1 &&
              product?.description?.map((el) => (
                <li className="mb-[5px] leading-6" key={el}>
                  {el}
                </li>
              ))}
            {product?.description?.length === 1 && (
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description[0]),
                }}
              ></div>
            )}
          </ul>

          <div className="my-4 flex gap-4">
            <span className="text-sm font-semibold">Color</span>
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div
                onClick={() => setVarriant(null)}
                className={clsx(
                  "flex items-center gap-2 p-2 border cursor-pointer",
                  !varriant && "border-red-500"
                )}
              >
                <img
                  src={product?.thumb}
                  alt="thumb"
                  className="w-8 h-8 rounded-md object-cover"
                />
                <span className="flex flex-col">
                  <span>{product?.color}</span>
                  <span className="text-sm">{`${formatMoney(
                    formatPrice(product?.price)
                  )} VND`}</span>
                </span>
              </div>
              {product?.varriants?.map((el) => (
                <div
                  key={el?.sku}
                  onClick={() => setVarriant(el?.sku)}
                  className={clsx(
                    "flex items-center gap-2 p-2 border cursor-pointer",
                    varriant === el?.sku && "border-red-500"
                  )}
                >
                  <img
                    src={el?.thumb}
                    alt="thumb"
                    className="w-8 h-8 rounded-md object-cover"
                  />
                  <span className="flex flex-col">
                    <span>{el?.color}</span>
                    <span className="text-sm">{`${formatMoney(
                      formatPrice(el?.price)
                    )} VND`}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-[422px] flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <span className=" text-sm font-semibold">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <Button handleOnClick={handleAddToCart} fw>
              ADD TO CART
            </Button>
          </div>
        </div>
        {/*End Depcriptions */}

        {/* ProductExtrainfo */}
        {!isQuickView && (
          <div className="w-1/5">
            {productExtrainfo.map((item) => (
              <ProductExtrainfo
                key={item.id}
                icons={item.icons}
                title={item.title}
                sub={item.sub}
              />
            ))}
          </div>
        )}
        {/*End ProductExtrainfo */}
      </div>

      {/* ProductInfoTab */}
      {!isQuickView && (
        <div className="w-main m-auto mt-8">
          <ProductInfoTab
            totalRatings={product?.totalRatings}
            ratings={product?.ratings}
            nameProduct={product?.title}
            pid={product?._id}
            rerender={rerender}
          />
        </div>
      )}
      {!isQuickView && (
        <>
          <div className="w-main m-auto mt-8">
            <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
              OTHER CUSTOMERS ALSO BUY
            </h3>
            <div className="mt-12 mx-[-10px] mb-12">
              <CustomSlider2 normal={true} products={relatedProducts} />
            </div>
          </div>
          <div className="w-full h-[100px]"></div>
        </>
      )}
    </div>
  );
};

export default withBaseComponent(ProductDetail);
