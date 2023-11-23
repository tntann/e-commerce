import React, { useState } from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      toast.success(response.mess);
    } else toast.info(response.mess);
  };

  return (
    <div className="w-main mb-6 mt-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex justify-center items-center mb-6">
          <img
            src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1698999176/ecommerce/changepass_hoyfgs.png"
            alt=""
          />
        </div>

        <div className="flex flex-col gap-4 items-center">
          <label htmlFor="" className=" text-lg font-semibold text-[#505050]">
            RESET YOUR PASSWORD
          </label>
          <span className=" text-sm text-[#505050]">
            Please enter your new password
          </span>
          <input
            type="password"
            name="password"
            id="password"
            className="w-[650px] p-3 my-3 placeholder:italic border placeholder:text-sm rounded-md border-gray-300 focus:border-main focus:outline-none"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-[650px] flex items-center gap-6">
          <Button name="SUBMIT" handleOnClick={handleResetPassword} fw />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
