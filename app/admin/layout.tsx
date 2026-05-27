import UserProvider from "@/components/UserProvider";
import React from "react";

function layout({ children }: LayoutProps<"/admin">) {
  return <UserProvider>{children}</UserProvider>;
}

export default layout;
