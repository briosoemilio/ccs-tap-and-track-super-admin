import { useEffect, useState } from "react";
import {
  UpdateUserReq,
  UserDetails,
} from "../../../lib/service/students/types";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { updateStudent } from "../../../lib/service/students/updateStudent";
import { updateStudentErrHandler } from "../../Students/utils";
import FormTextField from "../../../components/TextField/FormTextField";
import Loader from "../../../components/Loader/Loader";

export type EditAdminForm = {
  name?: string;
  email?: string;
};

const EditAdminModal = (props: { admin?: UserDetails }) => {
  const { admin } = props;
  const [initialState, setInitialState] = useState<UserDetails>();
  const [isLoading, setisLoading] = useState(false);
  const formMethods = useForm<EditAdminForm>();
  const { handleSubmit, setValue, control, setError } = formMethods;
  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (!admin) return;
    setInitialState(admin);
    setValue("name", admin?.name);
    setValue("email", admin?.email || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  const isModified =
    initialState?.name !== watchedValues.name ||
    initialState?.email !== watchedValues.email;

  const showEditSuccessModal = () => {
    const modal = document?.getElementById("edit_success");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.showModal();
  };

  const closeUpdateAdminModal = () => {
    const modal = document?.getElementById("update_admin");
    if (modal instanceof HTMLDialogElement === false) return;
    modal.close();
  };

  const onSubmit = async (data: EditAdminForm) => {
    try {
      setisLoading(true);
      const reqBody = {
        id: admin?.id,
        ...data,
      } as UpdateUserReq;
      const res = await updateStudent(reqBody);
      if (res.statusCode === 200) {
        showEditSuccessModal();
        closeUpdateAdminModal();
      }
    } catch (err) {
      updateStudentErrHandler(err, setError);
      if (err instanceof Error === false) return;
      console.log("Error on edit admin : ", err?.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <dialog id="update_admin" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Update Admin Details</h3>
        <FormProvider {...formMethods}>
          <FormTextField name="name" label={"Name"} />
          <FormTextField name="email" label={"Email"} />
          <div className="flex flex-row gap-5">
            <button
              className="flex-1 bg-blue-500 disabled:bg-slate-500"
              onClick={handleSubmit(onSubmit)}
              disabled={!isModified}
            >
              {isLoading && <Loader />}
              SAVE
            </button>
            <button
              className="flex-1 bg-red-500"
              onClick={() => closeUpdateAdminModal()}
            >
              CLOSE
            </button>
          </div>
        </FormProvider>
      </div>
    </dialog>
  );
};

export default EditAdminModal;
