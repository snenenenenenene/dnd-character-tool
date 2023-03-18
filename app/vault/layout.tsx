"use client";

import { ReactNode } from "react";

interface LayoutArgs {
  children: ReactNode;
}
export default function Page({ children }: LayoutArgs) {
  return <>{children}</>;
}
