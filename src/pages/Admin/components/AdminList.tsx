import React, { useMemo, useState } from "react";
import { UserDetails } from "../../../lib/service/students/types";
import { isEmpty } from "lodash";
import EditAdminModal from "./EditAdminModal";
import EditSuccessModal from "./EditSuccessModal";
import ResetPWModal from "./ResetPWModal";

const AdminList = (props: {
  adminList: UserDetails[];
  filteredAdminList: UserDetails[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  totalItems: number;
  page: number;
  itemsPerPage: number;
}) => {
  const {
    adminList,
    filteredAdminList,
    nextPage,
    prevPage,
    goToPage,
    totalItems,
    page: currentPage,
    itemsPerPage,
  } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const admins = useMemo(() => {
    if (!isEmpty(filteredAdminList)) return filteredAdminList;
    return adminList;
  }, [filteredAdminList, adminList]);

  const [selectedAdmin, setSelectedAdmin] = useState<UserDetails>();

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>UUID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin, index) => (
              <tr
                key={`admin-${index}`}
                className="hover:bg-slate-500 hover:cursor-pointer"
                onClick={() => {
                  setSelectedAdmin(admin);
                  document?.getElementById("update_admin").showModal();
                }}
              >
                <th>{index + 1}</th>
                <th>{admin?.uuid}</th>
                <th>{admin?.email}</th>
                <td>{admin?.name}</td>
                <td>{admin?.createdAt}</td>
                <td>{admin?.updatedAt}</td>
                <td>
                  <button
                    className="bg-red-600 z-10"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedAdmin(admin);
                      document?.getElementById("admin_reset_pw").showModal();
                    }}
                  >
                    RESET PASSWORD
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="btn btn-primary mx-1"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page + 1)}
              className={`btn mx-1 ${
                currentPage === page + 1 ? "btn-secondary" : "btn-primary"
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="btn btn-primary mx-1"
          >
            Next
          </button>
        </div>
      </div>
      <EditAdminModal admin={selectedAdmin} />
      <EditSuccessModal />
      <ResetPWModal adminIdentifier={selectedAdmin?.uuid as string} />
    </>
  );
};

export default AdminList;
