import { useState } from "react";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { useAuth } from "../../lib/context/AuthenticatedContext";
import AdminList from "./components/AdminList";
import { useFetchAdmins } from "./useFetchAdmins";
import EditAdminModal from "./components/EditAdminModal";
import EditSuccessModal from "./components/EditSuccessModal";
import ResetPWModal from "./components/ResetPWModal";
import { UserDetails } from "../../lib/service/students/types";
import { getStudent } from "../../lib/service/students/getStudent";
import CreateAdminModal from "./components/CreateAdminModal";
import ArchiveModal from "../../components/ArchiveUser/ArchiveModal";

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
  const [selectedAdmin, setSelectedAdmin] = useState<UserDetails>();
  const [showNote, setShowNote] = useState(false);

  const onClickEdit = async () => {
    const _user = await getStudent(user?.uuid as string);
    setSelectedAdmin(_user.data as unknown as UserDetails);
    showModal("update_admin");
  };

  const onClickReset = async () => {
    const _user = await getStudent(user?.uuid as string);
    setSelectedAdmin(_user.data as unknown as UserDetails);
    setShowNote(false);
    showModal("admin_reset_pw");
  };

  const showModal = (modalName: string) => {
    const modal = document?.getElementById(modalName);
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  return (
    <ScreenContainer>
      <div className="w-full">
        <p className="text-2xl">
          Hello admin: {user?.name}! How can I help you today?
        </p>
        <div className="flex justify-between my-10">
          <h1>Admin List</h1>
          <div className="flex gap-5">
            <button onClick={() => showModal("add_admin")}>
              Create Admin Account
            </button>
            <button onClick={onClickEdit}>Edit Account</button>
            <button onClick={onClickReset} className="bg-red-600">
              RESET PASSWORD
            </button>
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
          setSelectedAdmin={setSelectedAdmin}
          setShowNote={setShowNote}
        />
      </div>
      <EditAdminModal admin={selectedAdmin} />
      <EditSuccessModal />
      <ResetPWModal
        adminIdentifier={selectedAdmin?.uuid as string}
        showNote={showNote}
      />
      <CreateAdminModal />
      <ArchiveModal user={selectedAdmin as UserDetails} />
    </ScreenContainer>
  );
};

export default Admin;
