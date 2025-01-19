import React from "react";
import { Controller, ControllerProps, useFormContext } from "react-hook-form";
import TextField, { TextFieldProps } from "./TextField";

type ControlledInputProps = {
  name: string;
  rules?: ControllerProps["rules"];
  defaultValue?: string;
} & TextFieldProps;

const FormTextField = (props: ControlledInputProps) => {
  const { name, rules, defaultValue, ...rest } = props;
  const methods = useFormContext();

  return (
    <Controller
      control={methods.control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          error={error?.message}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
    />
  );
};

export default FormTextField;
