import React, { useCallback, useEffect, useState } from "react";
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from "../../apis/user";
import moment from "moment";
import { roles, blockStatus } from "../../utils/contains";
import {
  Button,
  InputField,
  InputForm,
  Pagination,
  Select,
} from "../../components";
import useDebounce from "../../hook/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
// import clsx from "clsx";

const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    emai: "",
    firstname: "",
    lastname: "",
    address: "",
    role: "",
    mobile: "",
    isBlocked: "",
  });

  const [users, setUsers] = useState([]);
  const [queries, setQueries] = useState({
    q: "",
  });

  const [update, setUpdate] = useState(false);
  const [editElm, setEditElm] = useState(null);

  const [params] = useSearchParams();

  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: +import.meta.env.VITE_APP_LIMIT,
    });
    if (response.success) setUsers(response);
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params, update]);

  const handleUpdate = async (data) => {
    // Kiểm tra xem editElm có tồn tại và có thuộc tính _id không
    if (editElm && editElm._id) {
      const response = await apiUpdateUser(data, editElm._id);
      if (response.success) {
        setEditElm(null);
        render();
        toast.success(response.mess);
      } else toast.error(response.mess);
    }
  };
  const handleDeleteUser = (userid) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you sure you want to delete this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(userid);
        if (response.success) {
          render();
          toast.success(response.mess);
        } else toast.error(response.mess);
      }
    });
  };

  useEffect(() => {
    if (editElm) {
      reset({
        email: editElm?.email,
        firstname: editElm?.firstname,
        lastname: editElm?.lastname,
        address: editElm?.address,
        role: editElm?.role,
        mobile: editElm?.mobile,
        isBlocked: editElm?.isBlocked,
      });
    }
  }, [editElm, reset]);

  return (
    <div className="w-full flex flex-col gap-4 bg-gray-50 relative">
      <div className="h-[69px] w-full"></div>
      <div className="bg-white border-b w-full flex items-center shadow-sm fixed top-0 ">
        <h1 className="h-[75px] flex justify-between items-center text-xl text-[#374151] font-semibold px-8">
          Manage Users
        </h1>
      </div>
      <div className="w-main p-[26px]">
        <div className="flex justify-start py-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            style={"w350"}
            placeholder="Search name or mail user..."
            isHideLabel
          />
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit(handleUpdate)}>
            {editElm && (
              <div className=" flex justify-start pb-[16px]">
                <Button type="submit">Update</Button>
              </div>
            )}
            <table className="table-auto mb-6 text-left w-main">
              <thead className="font-bold bg-[#4e73df] text-[13px] text-white">
                <tr className="border border-blue-500">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Email Address</th>
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Created At</th>

                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.users?.map((el, idx) => (
                  <tr key={el._id} className="border border-gray-400">
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">
                      {editElm?._id === el._id ? (
                        <InputForm
                          register={register}
                          fullWidth
                          errors={errors}
                          defaultValue={editElm?.email}
                          id={"email"}
                          validate={{
                            required: "Require fill.",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address",
                            },
                          }}
                        />
                      ) : (
                        <span>{el.email}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editElm?._id === el._id ? (
                        <InputForm
                          register={register}
                          fullWidth
                          errors={errors}
                          defaultValue={editElm?.firstname}
                          id={"firstname"}
                          validate={{ required: "Require fill." }}
                        />
                      ) : (
                        <span>{el.firstname}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editElm?._id === el._id ? (
                        <InputForm
                          register={register}
                          fullWidth
                          errors={errors}
                          defaultValue={editElm?.lastname}
                          id={"lastname"}
                          validate={{ required: "Require fill." }}
                        />
                      ) : (
                        <span>{el.lastname}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editElm?._id === el._id ? (
                        <InputForm
                          register={register}
                          fullWidth
                          errors={errors}
                          defaultValue={editElm?.address}
                          id={"address"}
                          validate={{ required: "Require fill." }}
                        />
                      ) : (
                        <span>{el.address}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editElm?._id === el._id ? (
                        <Select
                          register={register}
                          fullWidth
                          errors={errors}
                          defaultValue={+el.role}
                          id={"role"}
                          validate={{ required: "Require fill." }}
                          options={roles}
                        />
                      ) : (
                        <span>
                          {roles.find((role) => +role.code === +el.role)?.value}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editElm?._id === el._id ? (
                        <InputForm
                          register={register}
                          fullWidth
                          errors={errors}
                          defaultValue={editElm?.mobile}
                          id={"mobile"}
                          validate={{
                            required: "Require fill.",
                            pattern: {
                              value: /^[62|0]+\d{9}/gi,
                              message: "Invalid phone number",
                            },
                          }}
                        />
                      ) : (
                        <span>{el.mobile}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {editElm?._id === el._id ? (
                        <Select
                          register={register}
                          fullWidth
                          errors={errors}
                          defaultValue={el.isBlocked}
                          id={"isBlocked"}
                          validate={{ required: "Require fill." }}
                          options={blockStatus}
                        />
                      ) : (
                        <span>{el.isBlocked ? "Blocked" : "Active"}</span>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      {moment(el.createdAt).format("DD/MM/YYYY")}
                    </td>
                    <td className="py-2 px-4">
                      {editElm?._id === el._id ? (
                        <span
                          onClick={() => setEditElm(null)}
                          className="px-2 text-blue-600 hover:underline cursor-pointer"
                        >
                          Back
                        </span>
                      ) : (
                        <span
                          onClick={() => setEditElm(el)}
                          className="px-2 text-yellow-400 hover:underline cursor-pointer"
                        >
                          Edit
                        </span>
                      )}
                      <span
                        onClick={() => handleDeleteUser(el._id)}
                        className="px-2 text-main hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
        <div className="w-main flex justify-between">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
