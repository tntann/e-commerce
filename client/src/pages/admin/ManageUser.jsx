import React, { useEffect, useState } from "react";
import { apiGetUsers } from "../../apis/user";
import moment from "moment";
import { roles } from "../../utils/contains";

const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const fetchUsers = async (params) => {
    const response = await apiGetUsers(params);
    if (response.success) setUsers(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-xl text-[#374151] font-semibold px-4 border-b border-gray-400">
        <span>Manage users</span>
      </h1>
      <div className="w-full p-4">
        <table className="table-auto mb-6 text-left w-full">
          <thead className="font-bold bg-gray-700 text-[13px] text-white">
            <tr className="border border-gray-500">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Email address</th>
              <th className="px-4 py-2">Fullname</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((el, index) => (
              <tr key={el._id} className="border border-gray-500">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{el.email}</td>
                <td className="py-2 px-4">{`${el.lastname} ${el.firstname}`}</td>
                <td className="py-2 px-4">
                  {roles.find((role) => +role.code === +el.role)?.value}
                </td>
                <td className="py-2 px-4">{el.mobile}</td>
                <td className="py-2 px-4">
                  {el.isBlocked ? "Blocked" : "Active"}
                </td>
                <td className="py-2 px-4">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button className="p-2 w-[59px] text-white cursor-pointer border border-[#f4b30d] bg-[#f6c23e] hover:bg-[#f4b619] rounded-md">
                      <span className="flex items-center justify-center text-sm">
                        Edit
                      </span>
                    </button>
                    <button className="p-2 w-[59px] text-white cursor-pointer border border-[#d52a1a] bg-[#e74a3b] hover:bg-[#e02d1b] rounded-md">
                      <span className="flex items-center justify-center text-sm">
                        Delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
