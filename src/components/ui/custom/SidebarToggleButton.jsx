'use client';

import React, { useContext } from "react";
import { useSidebar } from "../sidebar";
import Image from "next/image";
import { UserDetailContext } from "@/context/UserDetailContext";

function SidebarToggleButton({ className = "" }) {
  const { toggleSidebar } = useSidebar() || {};
  const { userDetails } = useContext(UserDetailContext);

  const profileImage =
    userDetails?.picture?.trim() || "/default-avatar.png"; // fallback avatar

  return (
    <button
      onClick={toggleSidebar}
      className={`rounded-full border-2 border-transparent hover:border-blue-500 transition duration-200 ${className}`}
      aria-label="Toggle Sidebar"
      title="Open sidebar"
    >
      <Image
        src={profileImage}
        alt="User Avatar"
        width={36}
        height={36}
        className="rounded-full"
      />
    </button>
  );
}

export default SidebarToggleButton;
