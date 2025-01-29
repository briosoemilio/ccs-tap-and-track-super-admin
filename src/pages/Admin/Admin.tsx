import React from "react";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { useAuth } from "../../lib/context/AuthenticatedContext";
import AdminList from "./components/AdminList";
import { useFetchAdmins } from "./useFetchAdmins";

const Admin = () => {
  const { user } = useAuth();
  const {
    adminList,
    filteredAdminList,
    nextPage,
    prevPage,
    goToPage,
    totalItems,
    page,
    itemsPerPage,
  } = useFetchAdmins();
  return (
    <ScreenContainer>
      <div className="w-full">
        <p className="text-2xl">
          Hello admin: {user?.name}! How can I help you today?
        </p>
        <div className="flex justify-between my-10">
          <h1>Admin List</h1>
          <div className="flex gap-5">
            <button>Create Admin Account</button>
            <button>Edit Account</button>
          </div>
        </div>
        <AdminList
          adminList={adminList}
          filteredAdminList={filteredAdminList}
          nextPage={nextPage}
          prevPage={prevPage}
          goToPage={goToPage}
          totalItems={totalItems}
          page={page}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </ScreenContainer>
  );
};

export default Admin;
