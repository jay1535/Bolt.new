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
      console.log(result);
    } catch (error) {
      console.error("Failed to fetch workspaces", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>

      <div className="mt-2">
        {loading ? (
          <p className="text-md text-gray-300">Loading workspaces...</p>
        ) : workspaceList.length > 0 ? (
          workspaceList.map((workspace) => (
            <Link
              href={`/workspace/${workspace?._id}`}
              key={workspace._id}
              onClick={toggleSidebar}
            >
              <h2 className="text-sm text-gray-400 mt-2 font-medium hover:text-white cursor-pointer">
                {workspace?.messages?.[0]?.context ?? "No context"}
              </h2>
            </Link>
          ))
        ) : (
          <p className="text-md text-white">No workspaces found.</p>
        )}
      </div>
    </div>
  );
}

export default WorkSpaceHistory;
