"use client";

import React from "react";
import clsx from "clsx";
import { redirect } from "next/navigation";
import { useUser } from "./UserProvider";

interface ProtectedRouteProps {
  className?: string;
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  className,
  children,
}) => {
  const { user, initializing } = useUser();

  if (initializing) return <div>Loading...</div>;
  if (!user) redirect("/admin/login");

  return <div className={clsx("", className)}>{children}</div>;
};

export default ProtectedRoute;
