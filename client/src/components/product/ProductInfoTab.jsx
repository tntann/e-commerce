import React, { useState } from "react";
import { productInfoTabs } from "../../utils/contains";
import { Votebar, Button, VoteOption, Comment } from "..";
import { renderStartFromNumber } from "../../utils/helper";
import { apiRatings } from "../../apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../app/appSlice/";
import Swal from "sweetalert2";
import path from "../../utils/path";
import { useNavigate } from "react-router-dom";

// const activedStyles = "";
// const notActivedStyles = "";

const ProductInfoTab = ({
  totalRatings,
  ratings,
  nameProduct,
  pid,
  rerender,
}) => {
  const [activedTab, setActivedTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleSubmitVoteOption = async ({ comment, score }) => {
    // console.log({ comment, score, pid });
    if (!comment || !score || !pid) {
      alert("Please vote and comment");
      return false;
    }
    await apiRatings({
      star: score,
      comment: comment,
      pid,
      updatedAt: Date.now(),
    });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    rerender();
  };

  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Please login to vote",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Opps!",
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              handleSubmitVoteOption={handleSubmitVoteOption}
              nameProduct={nameProduct}
            ></VoteOption>
          ),
        })
      );
    }
  };
  return (
    <div className="">
      <div className="flex items-center gap-1 relative bottom-[-1px]">
        {productInfoTabs.map((el) => (
          <span
            className={`py-2 text-[#505050] px-4 cursor-pointer ${
              activedTab === el.id
                ? " bg-white border border-b-0"
                : "bg-[#f1f1f1]"
            }`}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
        {/* <div
          className={`py-2 text-[#505050] px-4 cursor-pointer ${
            activedTab === 5 ? " bg-white border border-b-0" : "bg-[#f1f1f1]"
          }`}
          onClick={() => setActivedTab(5)}
        >
          CUSTOMER REVIEW
        </div> */}
      </div>
      <div className="w-full border p-4">
        {productInfoTabs.some((el) => el.id === activedTab) &&
          productInfoTabs.find((el) => el.id === activedTab)?.content}
      </div>

      <div className="flex flex-col py-8 w-main">
        <div className="flex ">
          <div className="flex-4 border flex flex-col gap-1 justify-center items-center border-main ">
            <span className=" font-semibold text-2xl">{`${totalRatings}/5`}</span>
            <span className=" flex items-center gap-1">
              {renderStartFromNumber(totalRatings)?.map((el, index) => (
                <span key={index}>{el}</span>
              ))}
            </span>
            <span className="text-sm">{`${ratings?.length} reviews`}</span>
          </div>
          <div className="flex-6 border flex flex-col p-4 gap-2">
            {Array.isArray(ratings) &&
              Array.from(Array(5).keys())
                .reverse()
                .map((el) => (
                  <Votebar
                    key={el}
                    number={el + 1}
                    ratingTotal={ratings?.length}
                    ratingCount={
                      ratings?.filter((i) => i.star === el + 1)?.length
                    }
                  />
                ))}
          </div>
        </div>
        <div className="p-4 flex items-center justify-center text-sm flex-col gap-2">
          <span>What do you think about this product?</span>
          <Button handleOnClick={handleVoteNow}>Reviews</Button>
        </div>

        <div className="flex flex-col gap-4 text-justify">
          {ratings?.map((el) => (
            <Comment
              key={el._id}
              star={el.star}
              updatedAt={el.updatedAt}
              comment={el.comment}
              name={`${el.postedBy?.firstname} ${el.postedBy?.lastname}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfoTab;
