import React, { useState } from "react";
import { Button, InputFile, InputForm, MdEditor } from "../../components";
import { toast } from "react-toastify";
import { apiCreateNewBlog } from "../../apis";
import { useForm } from "react-hook-form";

const CreateBlog = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const handlePublish = async ({ image, ...data }) => {
    const payload = new FormData();
    for (let i of Object.entries(data)) payload.append(i[0], i[1]);
    payload.append("image", image[0]);
    setIsLoading(true);
    const response = await apiCreateNewBlog(payload);
    setIsLoading(false);
    if (response.success) {
      setValue("title", "");
      setValue("description", "");
      setValue("hashtags", "");
      setValue("image", "");
      toast.success(response.mess);
    } else toast.error(response.mess);
  };
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="bg-white border-b w-full flex items-center shadow-sm fixed z-10 top-0 ">
        <h1 className="h-[75px] flex justify-between items-center text-xl text-[#374151] font-semibold px-8">
          Create News
        </h1>
      </div>
      <div className="px-4 flex flex-col gap-4">
        <InputForm
          id="title"
          errors={errors}
          validate={{ required: "This field cannot empty." }}
          register={register}
          label="Title"
          placeholder="Enter the article title"
        />
        <InputForm
          id="hashtags"
          errors={errors}
          validate={{ required: "This field cannot empty." }}
          register={register}
          label="Tags"
          placeholder="Enter the article tags"
        />
        <MdEditor
          id="description"
          errors={errors}
          validate={{ required: "This field cannot empty." }}
          register={register}
          label="Content"
          height={800}
          setValue={setValue}
          value={watch("description")}
        />
        <div>
          <InputFile
            register={register}
            errors={errors}
            id="image"
            validate={{ required: "This field cannot empty." }}
            label="Images"
          />
        </div>
        <div className="my-6">
          <Button
            disabled={isLoading}
            handleOnClick={handleSubmit(handlePublish)}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateBlog;
