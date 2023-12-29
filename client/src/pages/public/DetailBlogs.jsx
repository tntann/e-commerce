import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetBlogById } from "../../apis/blog";
import moment from "moment";
import DOMPurify from "dompurify";
import { Blogs } from "../../components";

const DetailBlogs = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();
  const fetchBlog = async () => {
    const response = await apiGetBlogById(id);
    if (response.success) setBlog(response.result);
  };
  useEffect(() => {
    if (id) fetchBlog();
  }, [id]);
  return (
    <div className="w-main mx-auto my-6 pb-6">
      <h1 className="text-2xl font-semibold text-main">{blog?.title}</h1>
      <small>
        By: <span>{blog?.author}</span>
      </small>
      <small className="mx-4">
        <span>{moment(blog?.createdAt).format("DD/MM/YYYY")}</span>
      </small>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blog?.description),
        }}
        className="mt-4 text-[#151515]"
      ></div>
      {/* TECHNOLOGY NEWS */}
      <div className="my-8 w-main m-auto">
        <Blogs />
      </div>
    </div>
  );
};

export default DetailBlogs;
