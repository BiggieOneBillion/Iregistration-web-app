import { border, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface PropsType<T extends FieldValues> {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  register: UseFormRegister<T>;
  inputname: Path<T>;
  // error?: Record<Path<T>, { message: string }>;
  error?: FieldError;
}

const InputContainer = <T extends FieldValues>({
  icon,
  placeholder,
  type,
  inputname,
  register,
  error,
}: PropsType<T>) => {
  return (
    <div className="space-y-1">
      <InputGroup size={"lg"}>
        <InputLeftElement pointerEvents="none">
          <span className="text-gray-500">{icon}</span>
        </InputLeftElement>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(inputname, { required: true })}
        />
      </InputGroup>
      {error && <div className="text-red-500 text-sm">{error.message}</div>}
    </div>
  );
};

export default InputContainer;
