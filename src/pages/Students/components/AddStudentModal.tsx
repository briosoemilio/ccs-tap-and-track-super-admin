import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../../components/TextField/FormTextField";
import { createStudent } from "../../../lib/service/students/createStudent";
import { CreateUserReq } from "../../../lib/service/students/types";
import Loader from "../../../components/Loader/Loader";
import { addStudentErrHandler } from "../utils";

export type AddStudentForm = {
  name: string;
  yearSection: string;
  idNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const AddStudentModal = () => {
  // Hooks
  const [isLoading, setIsLoading] = useState(false);
  const formMethods = useForm<AddStudentForm>();
  const { handleSubmit, setError } = formMethods;

  // Functions
  const closeAddModal = () =>
    document?.getElementById("add_student")?.close?.();

  const openSuccessModal = () =>
    document?.getElementById("add_success")?.showModal?.();

  const onPressCreate = async (data: AddStudentForm) => {
    setIsLoading(true);
    try {
      const reqBody = {
        email: data.email,
        name: data.name,
        role: "STUDENT",
        yearSection: data.yearSection,
        idNumber: data.idNumber,
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
    <dialog id="add_student" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Student Details</h3>
        <FormProvider {...formMethods}>
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
            name={"yearSection"}
            label="Year and Section"
            placeholder="Enter year and section"
            rules={{
              required: "Year and section is required.",
            }}
            required
          />
          <FormTextField
            name={"idNumber"}
            label="ID Number"
            placeholder="Please enter ID Number"
            rules={{
              required: "ID Number is required.",
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
          <div className="mb-5">
            <span className="font-bold">NOTE: </span>
            An auto generated password will be sent via email to the student.
          </div>
          <div className="flex flex-row gap-5">
            <button
              className="flex-1 bg-blue-500"
              onClick={handleSubmit(onPressCreate)}
            >
              {isLoading && <Loader />}
              Create Student
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
    <dialog id="add_success" className="modal">
      <div className="modal-box">
        <h1 className="text-center">Successfully Created User</h1>
        <div className="h-[50px]" />
        <div className="flex flex-row gap-5">
          <button
            className="flex-1 bg-red-500"
            onClick={() => {
              document?.getElementById("add_success").close();
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

export default AddStudentModal;
