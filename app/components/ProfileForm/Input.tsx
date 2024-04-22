import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: ReactNode;
  register: ReturnType<UseFormRegister<any>>;
}

export const FormInput = (props: InputProps) => {
  const { register, label, name, ...rest } = props;

  return (
    <div>
      <label className="block text-sm font-medium leading-6">
        {label}
      </label>
      <input
        placeholder="type here..."
        {...register}
        {...rest}
        className={`mt-2 block w-full rounded-md border-0 py-1.5 ps-2 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800 ${rest.className}`}
      />
    </div>
  );
};

interface Option {
  value: string | number;
  label: string;
}

type FormSelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & InputProps & {
  options: Option[];
} 

export const FormSelect = (props: FormSelectProps) => {
  const { register, label, options, ...rest } = props;

  return (
    <div>
      <label className="block text-sm font-medium leading-6">
        {label}
      </label>
      <select
        {...register}
        className={`mt-2 block w-full rounded-md border-0 py-2 ps-2 shadow-sm ring-1 ring-inset ring-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-800 ${rest.className || ""}`}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

