import React from "react";
import ScreenContainer from "../../components/ScreenContainer/ScreenContainer";
import { FormProvider, useForm } from "react-hook-form";
import FormTextField from "../../components/TextField/FormTextField";

type AddStudentForm = {
  name: string;
  yearSection: string;
  idNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const AddStudent = () => {
  const formMethods = useForm<AddStudentForm>();
  return (
    <ScreenContainer>
      <div>
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
          <FormTextField
            name={"password"}
            label="Password"
            placeholder="Enter password"
            type="password"
            rules={{ required: "Password is required." }}
            required
          />
          <FormTextField
            name={"confirmPassword"}
            label="Confirm Password"
            placeholder="Re-enter password"
            type="password"
            rules={{ required: "Password is required." }}
            required
          />
          <button>Create Student</button>
        </FormProvider>
      </div>
    </ScreenContainer>
  );
};

export default AddStudent;
