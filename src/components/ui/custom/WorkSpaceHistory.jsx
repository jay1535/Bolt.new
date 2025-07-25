"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { useConvex } from "convex/react";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { useSidebar } from "../sidebar";

function WorkSpaceHistory() {
  const { userDetails } = useContext(UserDetailContext);
  const convex = useConvex();
  const { toggleSidebar } = useSidebar();

  const [workspaceList, setWorkspaceList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetails?._id) {
      GetAllWorkspace();
    }
  }, [userDetails]);

  const GetAllWorkspace = async () => {
    try {
      setLoading(true);
      const result = await convex.query(api.workspace.GetAllWorkspace, {
        userId: userDetails._id,
      });
      setWorkspaceList(result);
    } catch (error) {
      console.error("Failed to fetch workspaces", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-lg text-white">Your Chats</h2>

      <div
        className="mt-2 p-3 rounded-lg border border-blue-800 shadow-md"
        style={{ backgroundColor: "rgba(30, 41, 59, 0.6)" }}
      >
        {loading ? (
          <p className="text-md text-gray-300">Loading workspaces...</p>
        ) : workspaceList.length > 0 ? (
          workspaceList.map((workspace) => (
            <div
              key={workspace._id}
              className="flex p-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <Link
                href={`/workspace/${workspace._id}`}
                onClick={toggleSidebar}
                className="flex-1 text-sm text-gray-300 hover:text-white"
              >
                {workspace?.messages?.[0]?.context ?? "No context"}
              </Link>
            </div>
          ))
        ) : (
          <p className="text-md text-white">No workspaces found.</p>
        )}
      </div>
    </div>
  );
}

export default WorkSpaceHistory;
