/* eslint-disable no-unused-vars */
import React from "react";
interface Props {
  className?: string;
  id?: string;
  placeholder?: string;
  value?: any;
  type?: "text" | "textarea" | "password" | "email" | "number";
  onChange?: (e: any) => void;
}

export const Input = ({
  className,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <input
      className={`uppercase cursor-pointer text-xl rounded-md border-2 border-light-primary py-4 px-8 h-16 w-full justify-center flex text-light-primary active:border-light-accent transition-all  ${className}`}
      onChange={onChange}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
    />
  );
};
