import React, { useEffect, useState } from "react";
import { apiGetBlogs } from "../../apis";
import { Link } from "react-router-dom";
import path from "../../utils/path";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const fetchBlogs = async () => {
    const response = await apiGetBlogs({ limit: 4 });
    if (response.success) setBlogs(response.blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        TECHNOLOGY NEWS
      </h3>
      <div className="lg:grid w-screen lg:w-full pr-8 lg:pr-0 lg:grid-cols-4 gap-4">
        {blogs?.map((el) => (
          <div key={el.id} className="rounded-md border my-6">
            <Link to={`/${path.BLOGS}/${el?.id}/${el?.title}`}>
              <img
                src={el.image}
                alt=""
                className="w-full h-48 object-cover rounded-tl-md rounded-tr-md"
              />
            </Link>
            <div className="p-3">
              <Link
                to={`/${path.BLOGS}/${el?.id}/${el?.title}`}
                className="text-[#151515] hover:text-main line-clamp-2 cursor-pointer"
              >
                {el?.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blogs;
