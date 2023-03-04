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
      className={`${className} bg-light-secondary text-light-primary cursor-pointer text-center rounded-md border-2 border-light-secondary py-4 px-8 justify-center flex items-center hover:bg-light-secondary hover:border-light-primary transition-all  `}
      id={id}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
