import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const MarkdownEditor = ({
  label,
  value,
  changeValue,
  name,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="flex flex-col ">
      <span className="">{label}</span>
      <Editor
        apiKey="11k9bl3m31sjcwt67c193o1e9y3ddbn7m2ick44o1wiksprf"
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) =>
          changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))
        }
        onFocus={() => {
          setInvalidFields && setInvalidFields([]);
        }}
      />
      {invalidFields?.some((el) => el.name === name) && (
        <small className="text-main text-sm">
          {invalidFields?.find((el) => el.name === name)?.mess}
        </small>
      )}
    </div>
  );
};

export default MarkdownEditor;
