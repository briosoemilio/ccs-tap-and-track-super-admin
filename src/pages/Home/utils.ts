import { UseFormSetError } from "react-hook-form";
import { LoginFormData } from "./components/LoginForm";

export const loginErrHandler = (
  err: unknown,
  setError: UseFormSetError<LoginFormData>
) => {
  if (err instanceof Error === false) return;
  if (err?.message?.includes("Wrong password")) {
    setError("password", { message: "Incorrect password" });
    return;
  }

  if (err?.message?.includes("Unauthorized")) {
    setError("email", {
      message: "Unauthorized, please use valid admin account",
    });
    return;
  }

  if (err?.message?.includes("email not found")) {
    setError("email", {
      message: "Unauthorized, please use valid admin account",
    });
    return;
  }

  setError("password", {
    message: "An error occured. Please try again.",
  });
};
