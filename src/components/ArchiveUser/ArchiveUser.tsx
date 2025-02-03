import { UserDetails } from "../../lib/service/students/types";

const ArchiveUser = (props: { user: UserDetails; onClick: () => void }) => {
  const { user, onClick } = props;
  const isArchived = user?.isArchived;
  const showModal = () => {
    const modal = document?.getElementById("archive_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  return (
    <button
      className={isArchived ? "bg-red-600" : "bg-green-600"}
      onClick={(event) => {
        event.stopPropagation(); // Prevents triggering row click
        onClick();
        showModal();
      }}
    >
      {isArchived ? "ARCHIVED" : "ACTIVE"}
    </button>
  );
};

export default ArchiveUser;
