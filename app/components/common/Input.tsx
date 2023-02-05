/* eslint-disable no-unused-vars */
import React from "react";
interface Props {
  className?: string;
  id?: string;
  placeholder?: string;
  value?: any;
  type?: "submit" | "button" | "reset" | undefined;
  onChange?: (e: any) => void;
}

export const Input = ({
  className,
  id,
  type,
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <input
      className={`  cursor-pointer text-xl rounded-md border-2 border-light-primary py-4 px-8 h-20 w-60 justify-center flex text-light-primary active:border-light-accent transition-all  ${className}`}
      onChange={onChange}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
    ></input>
  );
};
