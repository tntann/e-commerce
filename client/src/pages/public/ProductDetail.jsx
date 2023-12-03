import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "../../apis";
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
// import ImageGallery from "react-image-gallery";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const ProductDetail = () => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setCurrentImage(response.productData?.thumb);
    }
  };

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response.success) setRelatedProducts(response.products);
  };

  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    window.scrollTo(0, 0);
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
  return (
    <div className="w-full">
      {/* breadcrumbs */}
      <div className="h-[81px] flex justify-center items-center bg-[#f7f7f7]">
        <div className="w-main mt-[10px] mb-[10px]">
          <h3 className="mb-[10px] font-semibold">{title}</h3>
          <BreadCrumb title={title} category={category} />
        </div>
      </div>
      {/*end breadcrumbs */}

      <div className="w-main m-auto mt-5 flex">
        {/* Images */}
        <div className="w-2/5 flex flex-col gap-[30px]">
          <div className="w-[458px]">
            <img
              src={currentImage}
              alt="product"
              className="w-[458px] h-[458px] border border-gray-300 object-contain rounded-lg"
            />
          </div>
          <div className="w-[458px]">
            <Slider {...settings}>
              {product?.images?.map((el, index) => (
                <div key={index} className="border-none outline-none">
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
        <div className="w-2/5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] text-[#333] leading-[35px] font-semibold">
              {`${formatMoney(formatPrice(product?.price))} VND`}
            </h2>
            {/* <span className="text-sm text-main">{`Quantity:${product?.quantity}`}</span> */}
          </div>
          <div className="flex items-center gap-1">
            {renderStartFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            {/* <span className="text-sm text-main italic">{`Sold:${product?.sold}`}</span> */}
          </div>
          <ul className="list-square text-sm text-[#505050] pl-[18px] ml">
            {product?.description?.map((el, index) => (
              <li className=" mb-[5px]" key={index}>
                {el}
              </li>
            ))}
          </ul>

          <div className="w-[422px] flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <span className=" text-sm font-semibold">Quantity</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
            <Button fw> ADD TO CART</Button>
          </div>
        </div>
        {/*End Depcriptions */}

        {/* ProductExtrainfo */}
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
        {/*End ProductExtrainfo */}
      </div>

      {/* ProductInfoTab */}
      <div className="w-main m-auto mt-8">
        <ProductInfoTab
          totalRatings={product?.totalRatings}
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
        />
      </div>
      <div className="w-main m-auto mt-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          OTHER CUSTOMERS ALSO BUY
        </h3>
        <div className="mt-12 mx-[-10px] mb-12">
          <CustomSlider2 normal={true} products={relatedProducts} />
        </div>
      </div>
      {/* <div className="w-full h-[100px]"></div> */}
    </div>
  );
};

export default ProductDetail;
