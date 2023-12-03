import React, { useRef, useEffect, useState } from "react";
import logo from "../../assets/hephonelogo.png";
import { voteOptions } from "../../utils/contains";
import icons from "../../utils/icons";
import Button from "../button/Button";

const { AiFillStar } = icons;

const VoteOption = ({ nameProduct, handleSubmitVoteOption }) => {
  const modalRef = useRef();
  const [chooseScore, setChooseScore] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
      className=" bg-white w-[650px] rounded-lg p-4 flex flex-col items-center justify-center gap-5"
    >
      {/* <div className="flex flex-col gap-4"> */}
      <img src={logo} alt="" className="w-[325px] h-[62px] my-8 object-cover" />
      <h2 className="text-center text-[#505050] font-medium text-lg">{`Reviews product ${nameProduct}`}</h2>
      <textarea
        placeholder="Please share some comments about the product (enter at least 15 characters)"
        className="p-3 w-full h-[128px] rounded-lg border focus:border-main outline-none border-gray-400 placeholder:text-[13px] placeholder:italic"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      {/* </div> */}
      <div className="w-full flex flex-col gap-5 ">
        <p className="flex justify-center">
          How do you feel about this product?
        </p>
        <div className="flex justify-center items-center gap-4">
          {voteOptions.map((el) => (
            <div
              className="w-[100px] h-[100px] p-4 cursor-pointer rounded-lg bg-gray-200 flex items-center justify-center flex-col gap-2"
              key={el.id}
              onClick={() => setChooseScore(el.id)}
            >
              {Number(chooseScore) && chooseScore >= el.id ? (
                <AiFillStar color="#ffce3d" size={20} />
              ) : (
                <AiFillStar color="gray" size={20} />
              )}
              <span className=" text-gray-700">{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Button
          handleOnClick={() =>
            handleSubmitVoteOption({ comment, score: chooseScore })
          }
          fw
        >
          SEND REVIEWS
        </Button>
      </div>
    </div>
  );
};

export default VoteOption;
