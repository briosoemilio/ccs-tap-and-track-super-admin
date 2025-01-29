import React from "react";

const EditSuccessModal = () => {
  return (
    <dialog id="edit_success" className="modal">
      <div className="modal-box">
        <h1 className="text-center">Successfully Updated</h1>
        <div className="h-[50px]" />
        <div className="flex flex-row gap-5">
          <button
            className="flex-1 bg-red-500"
            onClick={() => {
              document?.getElementById("edit_success").close();
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
