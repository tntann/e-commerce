import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { apiUpdateBlog } from "../../apis";
import { showModal } from "../../app/appSlice";
import { toast } from "react-toastify";
import { Button, InputFile, InputForm, MdEditor } from "../../components";

const UpdateBlog = ({ title, description, image: imageLink, hashtags, id }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
  } = useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    reset({
      title,
      description,
      hashtags,
    });
  }, [title]);
  const handleUpdate = async ({ image, ...data }) => {
    const payload = new FormData();
    for (let i of Object.entries(data)) payload.append(i[0], i[1]);
    if (image instanceof FileList && image.length > 0)
      payload.append("image", image[0]);
    else delete payload.image;

    setIsLoading(true);
    const response = await apiUpdateBlog(payload, id);
    setIsLoading(false);
    if (response.success) {
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      toast.success(response.mess);
    } else toast.error(response.mess);
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-[70%] max-h-screen h-full overflow-y-auto p-4"
    >
      <h1 className="text-2xl w-full font-bold border-b pb-3 tracking-tight">
        Update News
        <div className="my-2">
          <span className="text-main">{title}</span>
        </div>
      </h1>
      <div className="mt-4">
        <div className="px-4 flex flex-col gap-4">
          <InputForm
            id="title"
            errors={errors}
            validate={{ required: "This field cannot empty." }}
            register={register}
            label="Title"
            placeholder="Nhập tựa đề bài viết"
          />
          <InputForm
            id="hashtags"
            errors={errors}
            validate={{ required: "This field cannot empty." }}
            register={register}
            label="Tags"
            placeholder="Mỗi tag cách nhau dấu phẩy"
          />
          <MdEditor
            id="description"
            errors={errors}
            validate={{ required: "This field cannot empty." }}
            register={register}
            label="Content"
            height={800}
            setValue={setValue}
            value={getValues("description")}
          />
          <div>
            <InputFile
              register={register}
              errors={errors}
              id="image"
              label="Images"
            />
            {imageLink && !watch("image") && (
              <img src={imageLink} alt="" className="w-48 object-contain" />
            )}
          </div>
          <div className="my-6">
            <Button
              disabled={isLoading}
              handleOnClick={handleSubmit(handleUpdate)}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
