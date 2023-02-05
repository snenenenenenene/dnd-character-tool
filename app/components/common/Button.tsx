import React from "react";
interface Props {
  className?: string;
  id?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "submit" | "button" | "reset" | undefined;
}

export const Button = ({ className, id, onClick, children, type }: Props) => {
  return (
    <button
      className={` bg-light-primary cursor-pointer text-center rounded-md border-2 border-light-primary py-4 px-8 h-20 w-40 justify-center flex items-center hover:bg-light-secondary text-light-secondary hover:text-light-primary transition-all  ${className}`}
      id={id}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
