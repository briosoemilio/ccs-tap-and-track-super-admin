import React from "react";
import { UserDetails } from "../../lib/service/students/types";
import { unarchiveUser } from "../../lib/service/user/unarchiveUser";
import { archiveUser } from "../../lib/service/user/archiveUser";

const ArchiveModal = (props: { user: UserDetails }) => {
  const { user } = props;
  const isArchived = user?.isArchived;

  const closeModal = () => document?.getElementById("archive_modal").close();
  const showSuccessModal = () =>
    document?.getElementById("edit_success").showModal();

  const toggleArchive = async () => {
    if (isArchived) {
      const res = await unarchiveUser(user?.uuid);
      if (res) {
        showSuccessModal();
      }
    }

    if (!isArchived) {
      const res = await archiveUser(user?.uuid);
      if (res) {
        showSuccessModal();
      }
    }
    closeModal();
  };

  const HEADER = isArchived
    ? "Do you want to activate user?"
    : "Do you want to archive user?";
  const MESSAGE = isArchived
    ? "Active users can continue using the app. Do you want to continue?"
    : "Archived users are prevented from using the app. Do you want to continue?";

  return (
    <dialog id="archive_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-2xl mb-5">{HEADER}</h3>
        <div>Name: {user?.name}</div>
        <div className="mb-5">Email: {user?.email}</div>
        <p className="text-lg mb-5">{MESSAGE}</p>
        <div className="flex flex-row gap-5">
          {isArchived ? (
            <button className="flex-1 bg-green-500" onClick={toggleArchive}>
              ACTIVATE USER
            </button>
          ) : (
            <button className="flex-1 bg-red-500" onClick={toggleArchive}>
              ARCHIVE USER
            </button>
          )}
          <button
            className="flex-1"
            onClick={() => {
              document?.getElementById("archive_modal").close();
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ArchiveModal;
