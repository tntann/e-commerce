import React, { useEffect, useState } from "react";
import { apiAddVarriant } from "../../apis";
import { toast } from "react-toastify";
import { getBase64 } from "../../utils/helper";
import InputForm from "../input/InputForm";
import Button from "../button/Button";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const CustomizeVarriants = ({
  customizeVarriant,
  setCustomizeVarriant,
  //   render,
}) => {
  const [preview, setPreview] = useState({
    thumb: "",
    images: "",
  });
  // const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  useEffect(() => {
    reset({
      title: customizeVarriant?.title,
      color: customizeVarriant?.color,
      price: customizeVarriant?.price,
    });
  }, [customizeVarriant]);
  const handleAddVarriant = async (data) => {
    if (data.color === customizeVarriant.color)
      Swal.fire("Oops!", "Color not changed", "info");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }))
      const response = await apiAddVarriant(formData, customizeVarriant._id);
      // dispatch(showModal({ isShowModal: false, modalChildren: null }))
      if (response.success) {
        toast.success(response.mess);
        reset();
        setPreview({ thumb: "", images: [] });
      } else toast.error(response.mess);
    }
  };
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File not supported!");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
  }, [watch("thumb")]);
  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
  }, [watch("images")]);
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="bg-white w-full shadow-sm fixed top-0">
        <h1 className="h-[75px] flex justify-between items-center text-xl text-[#374151] font-semibold px-8">
          <span>Custiomize varriants of products</span>
        </h1>
      </div>
      <div className="p-8">
        <button
          className="p-2 mb-4 ml-4 w-[75px] text-white cursor-pointer border border-blue-600 bg-blue-600 hover:bg-blue-500 rounded-md flex items-center justify-center text-sm"
          onClick={() => setCustomizeVarriant(null)}
        >
          BACK
        </button>
        <form
          onSubmit={handleSubmit(handleAddVarriant)}
          className="p-4 w-full flex flex-col gap-4"
        >
          <div className="flex gap-4 items-center w-full">
            <InputForm
              label="Original name"
              register={register}
              errors={errors}
              id="title"
              fullWidth
              style="flex-auto"
              validate={{
                required: "Need fill this field",
              }}
              placeholder="Title of varriant"
            />
          </div>
          <div className="flex gap-4 items-center w-full">
            <InputForm
              label="Price varriant"
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Need fill this field",
              }}
              fullWidth
              placeholder="Price of new varriant"
              type="number"
              style="flex-auto"
            />
            <InputForm
              label="Color varriant"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "Need fill this field",
              }}
              fullWidth
              placeholder="Color of new varriant"
              style="flex-auto"
            />
          </div>
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="thumb">
              Upload thumb
            </label>
            <input
              type="file"
              id="thumb"
              {...register("thumb", { required: "Need fill" })}
            />
            {errors["thumb"] && (
              <small className="text-xs text-red-500">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>
          {preview.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="products">
              Upload images of product
            </label>
            <input
              type="file"
              id="products"
              multiple
              {...register("images", { required: "Need fill" })}
            />
            {errors["images"] && (
              <small className="text-xs text-red-500">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images.length > 0 && (
            <div className="my-4 flex w-full gap-3 flex-wrap">
              {preview.images?.map((el, idx) => (
                <div key={idx} className="w-fit relative">
                  <img
                    src={el}
                    alt="product"
                    className="w-[200px] object-contain"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="my-6">
            <Button type="submit">Add varriant</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomizeVarriants;
