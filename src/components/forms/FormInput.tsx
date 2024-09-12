import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TProps<TFieldValue extends FieldValues> = {
  register: UseFormRegister<TFieldValue>;
  name: Path<TFieldValue>;
  label: string;
  type?: string;
  placeholder: string;
  error?: string;
  isValid: boolean;
  validMessage: string;
  defaultValue?: string | undefined;
};

const FormInput = <TFieldValue extends FieldValues>({
  register,
  name,
  label,
  defaultValue,
  type = "text",
  placeholder,
  error,
  isValid,
  validMessage,
}: TProps<TFieldValue>) => {
  const inputStyle = ` ${
    error
      ? "border-red-500 focus:border-red-500"
      : isValid
        ? "border-green-700 focus:border-green-700"
        : "border-sky-400 focus:border-sky-500"
  } mb-3 max-w-full border-b-2 px-3 py-1 focus:outline-none`;

  return (
    <>
      <label className="mb-1 text-slate-700" htmlFor={name}>
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        className={inputStyle}
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <span className="-mt-1 mb-2 text-red-500">{error}</span>}
      {isValid && !error && (
        <span className="-mt-1 mb-2 text-green-700">{validMessage}</span>
      )}
    </>
  );
};

export default FormInput;
