import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../../components/TextField/FormTextField";
import { createStudent } from "../../../lib/service/students/createStudent";
import { CreateUserReq } from "../../../lib/service/students/types";
import Loader from "../../../components/Loader/Loader";
import { addStudentErrHandler } from "../../Students/utils";

export type AddAdminForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const CreateAdminModal = () => {
  // Hooks
  const [isLoading, setIsLoading] = useState(false);
  const formMethods = useForm<AddAdminForm>();
  const { handleSubmit, setError } = formMethods;
  const [role, setRole] = useState<"ADMIN" | "SUPER_ADMIN">("ADMIN");
  const ADMIN_DESC =
    "Admin accounts use the CCS Tap and Track Mobile app ADMIN flow to organize inventory, monitor logs, and other admin features.";
  const SUPER_ADMIN_DESC =
    "Super admin accounts use the CCS Tap and Track Web App to manage account creation, as well as resetting of passwords.";

  // Functions
  const closeAddModal = () => document?.getElementById("add_admin")?.close?.();

  const openSuccessModal = () =>
    document?.getElementById("add_admin_success")?.showModal?.();

  const onPressCreate = async (data: AddAdminForm) => {
    setIsLoading(true);
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", {
          message: "Passwords must be the same. Please check.",
        });
      }

      const reqBody = {
        email: data.email,
        name: data.name,
        role,
        password: data.password,
      } as CreateUserReq;

      const res = await createStudent(reqBody);

      if (res.statusCode === 201) {
        closeAddModal();
        openSuccessModal();
      }
    } catch (err) {
      addStudentErrHandler(err, setError);
      console.log("Error", err?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog id="add_admin" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-2xl">Admin Details</h3>
        <FormProvider {...formMethods}>
          <div className="mt-5">
            <h2 className="text-lg font-bold">Choose Role</h2>
            <div className="flex flex-row gap-5 mb-5">
              <button
                onClick={() => setRole("ADMIN")}
                className={`flex-1 border-2 ${
                  role === "ADMIN" && "border-blue-500"
                }`}
              >
                ADMIN
              </button>
              <button
                onClick={() => setRole("SUPER_ADMIN")}
                className={`flex-1 border-2 ${
                  role === "SUPER_ADMIN" && "border-blue-500"
                }`}
              >
                SUPER ADMIN
              </button>
            </div>
            {role === "ADMIN" && <span>{ADMIN_DESC}</span>}
            {role === "SUPER_ADMIN" && <span>{SUPER_ADMIN_DESC}</span>}
          </div>
          <FormTextField
            name={"name"}
            label="Name"
            placeholder="Enter name"
            rules={{
              required: "Name is required.",
            }}
            required
          />
          <FormTextField
            name={"email"}
            label="Email"
            placeholder="Email"
            rules={{
              required: "Email is required.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address.",
              },
            }}
            required
          />
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
          <div className="flex flex-row gap-5">
            <button
              className="flex-1 bg-blue-500"
              onClick={handleSubmit(onPressCreate)}
            >
              {isLoading && <Loader />}
              CREATE ADMIN
            </button>
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
        </FormProvider>
      </div>
      <AddSuccessModal />
    </dialog>
  );
};

const AddSuccessModal = () => {
  return (
    <dialog id="add_admin_success" className="modal">
      <div className="modal-box">
        <h1 className="text-center">Successfully Created User</h1>
        <div className="h-[50px]" />
        <div className="flex flex-row gap-5">
          <button
            className="flex-1 bg-red-500"
            onClick={() => {
              document?.getElementById("add_admin_success").close();
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

export default CreateAdminModal;
