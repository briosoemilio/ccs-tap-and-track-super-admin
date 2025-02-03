import { UseFormSetError } from "react-hook-form";
import { EditStudentForm } from "./components/StudentList";
import { AddStudentForm } from "./components/AddStudentModal";

export const updateStudentErrHandler = (
  err: unknown,
  setError: UseFormSetError<EditStudentForm>
) => {
  if (err instanceof Error === false) return;
  if (err?.message?.includes("email")) {
    setError("email", { message: "Email already used." });
    return;
  }

  if (err?.message?.includes("ID number")) {
    setError("idNumber", {
      message: "ID Number is already used.",
    });
    return;
  }

  setError("email", {
    message: "An error has occurred, please try again later.",
  });
};

export const addStudentErrHandler = (
  err: unknown,
  setError: UseFormSetError<AddStudentForm>
) => {
  if (err instanceof Error === false) return;
  if (err?.message?.includes("Email already used")) {
    setError("email", { message: "Email already used." });
    return;
  }

  if (err?.message?.includes("ID Number already used")) {
    setError("idNumber", {
      message: "ID Number is already used.",
    });
    return;
  }

  setError("email", {
    message: "An error has occurred, please try again later.",
  });
};
