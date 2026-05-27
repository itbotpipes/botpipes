import ProtectedRoute from "@/components/ProtectedRoute";
import StoreProvider from "@/components/StoreProvider";
import Navbar from "@/features/Admin/Navbar";
import React from "react";

function layout({ children }: LayoutProps<"/admin">) {
  return (
    <ProtectedRoute className="flex h-screen">
      <StoreProvider>
        <Navbar className="h-full w-[250px] rounded-r-lg shadow-lg" />
        <div className="max-h-screen flex-1 overflow-auto p-4 pb-10">
          {children}
        </div>
      </StoreProvider>
    </ProtectedRoute>
  );
}

export default layout;
