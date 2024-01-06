import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button, Loading } from "../../components";
import icons from "../../utils/icons";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router-dom";
import path from "../../utils/path";
import { login } from "../../app/user/userSlice";
import { showModal } from "../../app/appSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../utils/helper";

const { BiArrowBack } = icons;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayLoad] = useState({
    firstname: "",
    lastname: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [invalidFields, setInvalidFields] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPass, setIsForgotPass] = useState(false);
  const [searchParams] = useSearchParams();
  const resetPayLoad = () => {
    setPayLoad({
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
    });
  };

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    // console.log(response);
    if (response.success) {
      toast.success(response.mess);
    } else toast.info(response.mess);
  };

  useEffect(() => {
    resetPayLoad();
    window.scrollTo(0, 0);
  }, [isRegister]);

  // SUBMIT
  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    console.log(firstname, lastname, mobile);

    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);
    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        if (response.success) {
          setIsVerifiedEmail(true);
          // Swal.fire("Congratulation", response.mess, "success").then(() => {
          //   setIsRegister(false);
          //   resetPayLoad();
          // });
        } else Swal.fire("Oops!", response.mess, "error");
      } else {
        const result = await apiLogin(data);
        console.log({ result });
        if (result.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: result.accessToken,
              userData: result.userData,
              idUser: result.userData._id,
            })
          );
          searchParams.get("redirect")
            ? navigate(searchParams.get("redirect"))
            : navigate(`/${path.HOME}`);
        } else Swal.fire("Oops!", result.mess, "error");
      }
    }
  }, [payload, isRegister]);

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.success) {
      Swal.fire("Congratulation", response.mess, "success").then(() => {
        setIsRegister(false);
        resetPayLoad();
      });
    } else Swal.fire("Oops!", response.mess, "error");
    setIsVerifiedEmail(false);
    setToken("");
  };

  return (
    <div className="w-main relative bg-white mt-6">
      {/* modal register code */}
      {isVerifiedEmail && (
        <div className="w-full absolute top-0 left-0 right-0 bottom-6 bg-white z-20 flex flex-col justify-center items-center">
          <div className="bg-white w-[500px] rounded-md p-8 ">
            <div className="justify-center items-center flex flex-col gap-4">
              <h4 className=" text-gray-800">
                Please check your email and enter your code.
              </h4>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="p-2 border rounded-md outline-none w-[300px] focus:border-blue-500 focus:outline-none"
                placeholder="Enter your code here..."
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 font-semibold text-white rounded-md"
                onClick={finalRegister}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      )}
      {/* end modal register code */}

      {/* modal forgot password */}
      {isForgotPass && (
        <div className="absolute animate-slide-right top-0 left-0 right-0 bottom-0 bg-white flex flex-col items-center py-8 z-10">
          <div className="mb-6 flex justify-center items-center mt-10">
            <img
              src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1698999176/ecommerce/changepass_hoyfgs.png"
              alt=""
            />
          </div>

          <div className="flex flex-col gap-4 items-center">
            <label
              htmlFor="email"
              className=" text-lg font-semibold text-[#505050]"
            >
              RESET YOUR PASSWORD
            </label>
            <span className=" text-sm text-[#505050]">
              We will send you an email to reset your password.
            </span>
            <input
              type="email"
              name="email"
              id="email"
              className="w-[650px] p-3 my-3 placeholder:italic border placeholder:text-sm rounded-md border-gray-300 focus:border-main focus:outline-none"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-[650px] flex items-center gap-6">
            <Button name="SUBMIT" handleOnClick={handleForgotPassword} fw />
            <Button
              name="CANCEL"
              handleOnClick={() => setIsForgotPass(false)}
              style="p-3 my-3 rounded-md text-white bg-gray-400 font-semibold w-full hover:bg-gray-500 focus:outline-none focus:bg-gray-500 "
            />
          </div>
        </div>
      )}
      {/* modal forgot password */}

      {/* Login/SignUp */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-[50%] flex justify-center items-center flex-col">
          <div className="flex flex-col items-center min-w-[500px]">
            <h1 className="text-main font-semibold text-[28px] mb-8 flex">
              {isRegister ? "CREATE ACCOUNT" : "LOGIN"}
            </h1>
            <span className=" text-gray-500 text-base mb-3">
              Welcome to He Mobile ^_^
            </span>
            {isRegister && (
              <div className="flex items-center w-full justify-between gap-4">
                <InputField
                  value={payload.firstname}
                  setValue={setPayLoad}
                  nameKey="firstname"
                  type="text"
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  fullWidth
                />
                <InputField
                  value={payload.lastname}
                  setValue={setPayLoad}
                  nameKey="lastname"
                  type="text"
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                  fullWidth
                />
              </div>
            )}
            {isRegister && (
              <InputField
                value={payload.mobile}
                setValue={setPayLoad}
                nameKey="mobile"
                type=""
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                fullWidth
              />
            )}
            <InputField
              value={payload.email}
              setValue={setPayLoad}
              nameKey="email"
              type="email"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              fullWidth
            />
            <InputField
              value={payload.password}
              setValue={setPayLoad}
              nameKey="password"
              type="password"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              fullWidth
            />

            <Button
              name={isRegister ? "CREATE" : "LOGIN"}
              handleOnClick={handleSubmit}
              fw
            />

            <div className="flex items-center justify-between my-3 w-full text-sm">
              {!isRegister && (
                <span
                  onClick={() => setIsForgotPass(true)}
                  className="text-gray-700 hover:text-main cursor-pointer"
                >
                  Forgot your password?
                </span>
              )}
              {!isRegister && (
                <span
                  className="text-gray-700 hover:text-main cursor-pointer"
                  onClick={() => setIsRegister(true)}
                >
                  Create Account
                </span>
              )}
              {isRegister && (
                <span
                  className="text-gray-700 hover:text-main cursor-pointer flex items-center gap-1"
                  onClick={() => setIsRegister(false)}
                >
                  <BiArrowBack size={35} />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <img
            src="https://res.cloudinary.com/dxicjtlt4/image/upload/v1698772586/ecommerce/banner-login_zxxq2c.png"
            alt="banner-logo"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
