import { InputHTMLAttributes, ReactNode } from "react";

export type TextFieldProps = {
  label: string;
  placeholder?: string;

  left?: ReactNode;
  right?: ReactNode;

  error?: string;

  required?: boolean;
  disabled?: boolean;

  onClick?: () => void;
  onChangeText?: (
    text: string
  ) => void | ((text: string, rawText: string) => void);
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = (props: TextFieldProps) => {
  const {
    label,
    left,
    right,
    error,
    required,
    disabled,
    placeholder,
    onClick,
    ...rest
  } = props;
  return (
    <div className="my-5">
      <div className="font-bold">{label}</div>
      <label className="input input-bordered flex items-center gap-2">
        {left && <>{left}</>}
        <input
          onClick={() => onClick?.()}
          className="grow"
          placeholder={placeholder}
          name="email"
          required={required}
          disabled={disabled}
          {...rest}
        />
        {right && <>{right}</>}
      </label>
      {error && <div className="text-red-700 text-sm">{error}</div>}
    </div>
  );
};

export default TextField;
