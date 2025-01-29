import React, { useEffect, useMemo, useState } from "react";
import {
  UpdateUserReq,
  UserDetails,
} from "../../../lib/service/students/types";
import { isEmpty } from "lodash";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import FormTextField from "../../../components/TextField/FormTextField";
import { updateStudent } from "../../../lib/service/students/updateStudent";
import { updateStudentErrHandler } from "../../Students/utils";
import Loader from "../../../components/Loader/Loader";
import { overridePassword } from "../../../lib/service/admin/overridePassword";

const AdminList = (props: {
  adminList: UserDetails[];
  filteredAdminList: UserDetails[];
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  totalItems: number;
  page: number;
  itemsPerPage: number;
}) => {
  const {
    adminList,
    filteredAdminList,
    nextPage,
    prevPage,
    goToPage,
    totalItems,
    page: currentPage,
    itemsPerPage,
  } = props;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const admins = useMemo(() => {
    if (!isEmpty(filteredAdminList)) return filteredAdminList;
    return adminList;
  }, [filteredAdminList, adminList]);

  const [selectedAdmin, setSelectedAdmin] = useState<UserDetails>();

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>UUID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin, index) => (
              <tr
                key={`admin-${index}`}
                className="hover:bg-slate-500 hover:cursor-pointer"
                onClick={() => {
                  setSelectedAdmin(admin);
                  document?.getElementById("update_admin").showModal();
                }}
              >
                <th>{index + 1}</th>
                <th>{admin?.uuid}</th>
                <th>{admin?.email}</th>
                <td>{admin?.name}</td>
                <td>{admin?.createdAt}</td>
                <td>{admin?.updatedAt}</td>
                <td>
                  <button
                    className="bg-red-600 z-10"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedAdmin(admin);
                      document?.getElementById("admin_reset_pw").showModal();
                    }}
                  >
                    RESET PASSWORD
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="btn btn-primary mx-1"
          >
            Prev
          </button>
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page + 1)}
              className={`btn mx-1 ${
                currentPage === page + 1 ? "btn-secondary" : "btn-primary"
              }`}
            >
              {page + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="btn btn-primary mx-1"
          >
            Next
          </button>
        </div>
      </div>
      <EditAdminModal admin={selectedAdmin} />
      <EditSuccessModal />
      <ResetPWModal adminIdentifier={selectedAdmin?.uuid as string} />
    </>
  );
};

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
  }, [admin]);

  const isModified =
    initialState?.name !== watchedValues.name ||
    initialState?.email !== watchedValues.email;

  const onSubmit = async (data: EditAdminForm) => {
    try {
      setisLoading(true);
      const reqBody = {
        id: admin?.id,
        ...data,
      } as UpdateUserReq;
      const res = await updateStudent(reqBody);
      if (res.statusCode === 200) {
        document?.getElementById("edit_success").showModal();
        document?.getElementById("update_admin").close();
      }
    } catch (err) {
      updateStudentErrHandler(err, setError);
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
              onClick={() => {
                document?.getElementById("update_admin").close();
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

type ResetPwForm = {
  password: string;
  confirmPassword: string;
};

const ResetPWModal = (props: { adminIdentifier: string }) => {
  const { adminIdentifier } = props;
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
            <div>
              <p className="-mt-5 mb-5">
                <span className="font-bold">NOTE: </span> This will override the
                current password of the admin account. Are you sure you'd like
                to continue?
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
          </div>
          <div className="flex flex-row gap-5">
            <button
              disabled={!agree}
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

export default AdminList;
