/* eslint-disable no-unused-vars */
import React from "react";
import { InputProps } from "react-select";
interface Props {
  className?: string;
  id?: string;
  placeholder?: string;
  value?: any;
  type?: "text" | "textarea" | "password" | "email" | "number";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: InputProps;
}

export const Input = ({
  props,
  className,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}: Props) => {
  return (
    <input
      {...props}
      className={`bg-light-primary font-semibold text-2xl appearance-none w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-light-accent border-2 border-light-secondary ${className}`}
      onChange={onChange}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
    />
  );
};
