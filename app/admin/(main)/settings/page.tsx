import Options from "@/features/Admin/Settings/Options";
import React from "react";

export const runtime = 'edge';

function SettingsPage() {
  return (
    <div>
      <h1 className="mb-10 text-5xl">Settings</h1>
      <Options />
    </div>
  );
}

export default SettingsPage;
