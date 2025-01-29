import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { overridePassword } from "../../../lib/service/admin/overridePassword";
import FormTextField from "../../../components/TextField/FormTextField";
import Loader from "../../../components/Loader/Loader";

export type ResetPwForm = {
  password: string;
  confirmPassword: string;
};

const ResetPWModal = (props: {
  adminIdentifier: string;
  showNote?: boolean;
}) => {
  const { adminIdentifier, showNote = true } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const formMethods = useForm<ResetPwForm>();
  const { handleSubmit, setError } = formMethods;

  const onPressChange = async (data: ResetPwForm) => {
    console.log("pressed", data);
    const { password, confirmPassword } = data;
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        return setError("confirmPassword", {
          message: "Passwords must be the same. Please check again.",
        });
      }
      const res = await overridePassword(
        adminIdentifier,
        password,
        confirmPassword
      );
      if (res) {
        document?.getElementById("admin_reset_pw").close();
        document?.getElementById("edit_success").showModal();
      }
    } catch (err) {
      console.log("Err", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <dialog id="admin_reset_pw" className="modal">
      <div className="modal-box">
        <FormProvider {...formMethods}>
          <h3 className="font-bold text-2xl">Reset Password</h3>
          <div className="flex flex-col">
            <FormTextField
              name={"password"}
              label={"Enter new Password"}
              placeholder="Enter a password"
              type="password"
              rules={{
                required: "Password is required.",
              }}
              required
            />
            <FormTextField
              name={"confirmPassword"}
              label={"Re-enter new Password"}
              placeholder="Enter a password"
              type="password"
              rules={{
                required: "Password is required.",
              }}
              required
            />
            {showNote && (
              <div>
                <p className="-mt-5 mb-5">
                  <span className="font-bold">NOTE: </span> This will override
                  the current password of the admin account. Are you sure you'd
                  like to continue?
                </p>
                <div className="flex items-center gap-5 mb-5">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="checkbox"
                  />{" "}
                  <span>I agree to override the admin's password.</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-row gap-5">
            <button
              disabled={!showNote ? false : !agree}
              className="flex-1 bg-blue-500 disabled:bg-slate-500"
              onClick={handleSubmit(onPressChange)}
            >
              {isLoading && <Loader />}
              CHANGE PASSWORD
            </button>
            <button
              className="flex-1 bg-red-500"
              onClick={() => {
                document?.getElementById("admin_reset_pw").close();
                location.reload();
              }}
            >
              CLOSE
            </button>
          </div>
        </FormProvider>
      </div>
    </dialog>
  );
};

export default ResetPWModal;
