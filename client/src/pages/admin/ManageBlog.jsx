import React, { useEffect, useState } from "react";
import withBaseComponent from "../../hocs/withBaseComponent";
import { InputForm, Pagination } from "../../components";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { showModal } from "../../app/appSlice";
import moment from "moment";
import { toast } from "react-toastify";
import { apiDeleteBlog, apiGetBlogs } from "../../apis";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useDebounce from "../../hook/useDebounce";
import UpdateBlog from "./UpdateBlog";

const ManageBlog = ({ dispatch }) => {
  const [params] = useSearchParams();
  const [update, setUpdate] = useState(false);
  const [counts, setCounts] = useState(0);
  const [blogs, setBlogs] = useState();
  const { isShowModal } = useSelector((s) => s.appReducer);
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const fetchBlogs = async (param) => {
    const response = await apiGetBlogs({
      ...param,
      limit: import.meta.env.VITE_APP_LIMIT,
    });
    if (response.success) {
      setCounts(response.counts);
      setBlogs(response.blogs);
    }
  };

  const queryDebounce = useDebounce(watch("q"), 800);
  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    if (queryDebounce) searchParams.q = queryDebounce;
    if (!isShowModal) fetchBlogs(searchParams);
  }, [params, update, queryDebounce, isShowModal]);
  const handleDeleteBolg = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Confirm operation",
      text: "Are you sure you want to delete this post?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteBlog(id);
        if (response.success) {
          setUpdate(!update);
          toast.success(response.mess);
        } else toast.error(response.mess);
      }
    });
  };
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="bg-white border-b w-full flex items-center shadow-sm fixed top-0 ">
        <h1 className="h-[75px] flex justify-between items-center text-xl text-[#374151] font-semibold px-8">
          Manage News
        </h1>
      </div>
      <div className="flex justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search blogs by title, description,..."
          />
        </form>
      </div>
      <div className="px-4 w-full">
        <table className="table-auto w-full border">
          <thead>
            <tr className="border bg-[#4e73df] text-white border-gray-400">
              <th className="text-center py-2">#</th>
              <th className="text-center py-2">Title</th>
              <th className="text-center py-2">Hashtags</th>
              <th className="text-center py-2">Views</th>
              <th className="text-center py-2">Liked</th>
              <th className="text-center py-2">Disliked</th>
              <th className="text-center py-2">Created At</th>
              <th className="text-center py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((el, idx) => (
              <tr className="border-b" key={el._id}>
                <td className="text-center py-2">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    import.meta.env.VITE_APP_LIMIT +
                    idx +
                    1}
                </td>
                <td className="text-center">{el.title}</td>
                <td className="text-center">{el.hashtags}</td>
                <td className="text-center">{el.numberViews}</td>
                <td className="text-center">{el.likes?.length}</td>
                <td className="text-center">{el.dislikes?.length}</td>
                <td className="text-center">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="text-center py-2">
                  <span
                    onClick={() =>
                      dispatch(
                        showModal({
                          isShowModal: true,
                          modalChildren: <UpdateBlog {...el} />,
                        })
                      )
                    }
                    className="text-[#f6c23e] hover:text-[#f4b619] inline-block hover:underline cursor-pointer px-1"
                  >
                    <BiEdit size={22} />
                  </span>
                  <span
                    onClick={() => handleDeleteBolg(el.id)}
                    className="text-[#e74a3b] hover:text-[#e02d1b] inline-block hover:underline cursor-pointer px-1"
                  >
                    <RiDeleteBin6Line size={22} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full px-4 flex justify-end my-8">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default withBaseComponent(ManageBlog);
