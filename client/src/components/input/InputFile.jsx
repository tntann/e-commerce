import React, { useState } from "react";

const InputFile = ({ register, errors, image, id, label, validate }) => {
  const [preview, setPreview] = useState();
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold" htmlFor={id}>
        {label}
      </label>
      <input type="file" id={id} {...register(id, validate)} />
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
      {preview && (
        <img src={preview} alt="" className="w-20 object-contain mt-4" />
      )}
    </div>
  );
};

export default InputFile;
