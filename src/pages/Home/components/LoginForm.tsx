import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../../components/TextField/FormTextField";
import { login } from "../../../lib/service/auth/login";
import Loader from "../../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../lib/context/AuthenticatedContext";
import { loginErrHandler } from "../utils";

export type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const formMethods = useForm<LoginFormData>();
  const { handleSubmit, setError } = formMethods;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { onLogin } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await login(data);
      onLogin(res);
      navigate("/");
    } catch (err) {
      loginErrHandler(err, setError);
      console.log("Error logging in ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <FormProvider {...formMethods}>
        <FormTextField
          name={"email"}
          label="Email"
          placeholder="Enter Email"
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address.",
            },
          }}
          required
          left={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
          }
        />
        <FormTextField
          name={"password"}
          label="Password"
          placeholder="Enter password"
          type="password"
          rules={{ required: "Password is required." }}
          required
          left={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <button onClick={handleSubmit(onSubmit)}>
          {isLoading && <Loader />}
          LOGIN
        </button>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
