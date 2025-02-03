const EditSuccessModal = () => {
  const closeModal = () => {
    const modal = document?.getElementById("edit_success");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.close();
  };

  return (
    <dialog id="edit_success" className="modal">
      <div className="modal-box">
        <h1 className="text-center">Successfully Updated</h1>
        <div className="h-[50px]" />
        <div className="flex flex-row gap-5">
          <button
            className="flex-1 bg-red-500"
            onClick={() => {
              closeModal();
              location.reload();
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditSuccessModal;
