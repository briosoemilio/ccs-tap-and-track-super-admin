import { UseFormSetError } from "react-hook-form";
import { EditStudentForm } from "./components/StudentList";

export const updateStudentErrHandler = (
  err: unknown,
  setError: UseFormSetError<EditStudentForm>
) => {
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
};
