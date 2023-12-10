/* eslint-disable no-useless-escape */
import React, { useEffect } from "react";
import { Button, InputForm } from "../../components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/avat-default.png";
import { useForm } from "react-hook-form";
import { apiUpdateCurrent } from "../../apis";
import { toast } from "react-toastify";
import { getCurrent } from "../../app/user/asyncActions";
import { useSearchParams } from "react-router-dom";
import withBaseComponent from "../../hocs/withBaseComponent";

const Personal = ({ navigate }) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
    // watch,
  } = useForm();
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    reset({
      firstname: current?.firstname,
      lastname: current?.lastname,
      mobile: current?.mobile,
      email: current?.email,
      avatar: current?.avatar,
      address: current?.address,
    });
    window.scrollTo(0, 0);
  }, [current]);

  // const handleFile = async () => {
  //     if (watch('avatar') instanceof FileList && watch('avatar').length > 0) {
  //         return await getBase64(watch('avatar')[0])
  //     } else return false
  // }
  // useEffect(() => {
  //     if (watch('avatar') && isDirty) handleFile()
  // }, [watch('avatar')])
  // console.log(watch("avatar"));
  const handleUpdateInfor = async (data) => {
    const formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;
    for (let i of Object.entries(data)) formData.append(i[0], i[1]);

    const response = await apiUpdateCurrent(formData);
    if (response.success) {
      dispatch(getCurrent());
      toast.success(response.mess);
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
    } else toast.error(response.mess);
  };
  return (
    <div className="w-full relative px-4">
      <header className="text-2xl text-gray-700 font-semibold py-4 border-b border-b-blue-200">
        Infomation
      </header>
      <form
        onSubmit={handleSubmit(handleUpdateInfor)}
        className="w-3/5 mx-auto py-8 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <span className="font-medium">Profile image:</span>
          <label htmlFor="file">
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="w-20 h-20 ml-8 object-cover rounded-full cursor-pointer"
            />
          </label>
          <input type="file" id="file" {...register("avatar")} hidden />
        </div>
        <InputForm
          label="First Name"
          register={register}
          errors={errors}
          id="firstname"
          validate={{
            required: "Please fill out this field.",
          }}
        />
        <InputForm
          label="Last Name"
          register={register}
          errors={errors}
          id="lastname"
          validate={{
            required: "Please fill out this field.",
          }}
        />
        <InputForm
          label="Email Address"
          register={register}
          errors={errors}
          id="email"
          validate={{
            required: "Please fill out this field.",
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email invalid.",
            },
          }}
        />
        <InputForm
          label="Phone"
          register={register}
          errors={errors}
          id="mobile"
          validate={{
            required: "Please fill out this field.",
            pattern: {
              value:
                /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/gm,
              message: "Phone invalid.",
            },
          }}
        />
        <InputForm
          label="Address"
          register={register}
          errors={errors}
          id="address"
          validate={{
            required: "Please fill out this field.",
          }}
        />
        <div className="flex items-center gap-2">
          <span className="font-medium">Account status:</span>
          <span>{current?.isBlocked ? "Blocked" : "Actived"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Role:</span>
          <span>{+current?.role === 1 ? "Admin" : "User"}</span>
        </div>
        <div className="flex items-center gap-2 mb-8">
          <span className="font-medium">Created At:</span>
          <span>{moment(current?.createdAt).fromNow()}</span>
        </div>
        {isDirty && (
          <div className="w-full flex justify-end">
            <Button type="submit">Update information</Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default withBaseComponent(Personal);
