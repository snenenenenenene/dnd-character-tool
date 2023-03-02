/* eslint-disable no-unused-vars */
import React from "react";
interface Props {
  className?: string;
  id?: string;
  placeholder?: string;
  value?: any;
  type?: "text" | "textarea" | "password" | "email" | "number";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      className={`bg-gray-100 appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-2 border-gray-100 ${className}`}
      onChange={onChange}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
    />
  );
};
