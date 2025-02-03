import React, { useState } from "react";
import { addStudentErrHandler } from "../utils";
import { resetCardKey } from "../../../lib/service/user/resetCardKey";
import Loader from "../../../components/Loader/Loader";
import { UserDetails } from "../../../lib/service/students/types";

const ResetKeycardModal = (props: { user: UserDetails }) => {
  const { user } = props;
  // Hooks
  const [isLoading, setIsLoading] = useState(false);

  // Functions
  const closeAddModal = () =>
    document?.getElementById("reset_modal")?.close?.();

  const openSuccessModal = () =>
    document?.getElementById("reset_success")?.showModal?.();

  const onPressReset = async () => {
    setIsLoading(true);
    try {
      const res = await resetCardKey(user.uuid);

      if (res.statusCode === 200) {
        closeAddModal();
        openSuccessModal();
      }
    } catch (err) {
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
          <button
            className="flex-1"
            onClick={() => document?.getElementById("reset_modal").close()}
          >
            Close
          </button>
        </div>
      </div>
      <ResetSuccessModal />
    </dialog>
  );
};

const ResetSuccessModal = () => {
  return (
    <dialog id="reset_success" className="modal">
      <div className="modal-box">
        <h1 className="text-center">Successfully Reset User KeyCard</h1>
        <div className="h-[50px]" />
        <div className="flex flex-row gap-5">
          <button
            className="flex-1 bg-red-500"
            onClick={() => {
              document?.getElementById("reset_success").close();
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
