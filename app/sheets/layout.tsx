"use client";
import React from "react";
interface LayoutArgs {
  children: React.ReactNode;
}
export default function Page({ children }: LayoutArgs) {
  return <>{children}</>;
}
