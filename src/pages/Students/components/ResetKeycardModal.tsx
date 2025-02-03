import { useState } from "react";
import { resetCardKey } from "../../../lib/service/user/resetCardKey";
import Loader from "../../../components/Loader/Loader";
import { UserDetails } from "../../../lib/service/students/types";

const ResetKeycardModal = (props: { user: UserDetails }) => {
  const { user } = props;
  // Hooks
  const [isLoading, setIsLoading] = useState(false);

  // Functions
  const closeAddModal = () => {
    const modal = document?.getElementById("reset_modal");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.close();
  };

  const openSuccessModal = () => {
    const modal = document?.getElementById("reset_success");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.showModal();
  };

  const onPressReset = async () => {
    setIsLoading(true);
    try {
      const res = await resetCardKey(user.uuid);

      if (res.statusCode === 200) {
        closeAddModal();
        openSuccessModal();
      }
    } catch (err) {
      if (err instanceof Error === false) return;
      console.log("Error", err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="reset_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Student Details</h3>
        <div className="h-[120px] flex justify-center items-center">
          {" "}
          Are you sure you want to reset user's keycard?
        </div>
        <div className="flex flex-row gap-5">
          <button className="bg-red-600 flex-1" onClick={onPressReset}>
            {isLoading && <Loader />}
            RESET
          </button>
          <button className="flex-1" onClick={() => closeAddModal()}>
            Close
          </button>
        </div>
      </div>
      <ResetSuccessModal />
    </dialog>
  );
};

const ResetSuccessModal = () => {
  const closeAddModal = () => {
    const modal = document?.getElementById("reset_modal");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.close();
  };
  return (
    <dialog id="reset_success" className="modal">
      <div className="modal-box">
        <h1 className="text-center">Successfully Reset User KeyCard</h1>
        <div className="h-[50px]" />
        <div className="flex flex-row gap-5">
          <button
            className="flex-1 bg-red-500"
            onClick={() => {
              closeAddModal();
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

export default ResetKeycardModal;
