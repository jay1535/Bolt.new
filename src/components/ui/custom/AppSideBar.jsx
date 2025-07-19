"use client";

import React, { useContext } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { FaBolt } from "react-icons/fa6";
import { Button } from "../button";
import { MessageCircleCodeIcon } from "lucide-react";
import WorkSpaceHistory from "./WorkSpaceHistory";
import SideBarFooter from "./SideBarFooter";
import { useRouter } from "next/navigation";
import { MessagesContext } from "@/context/MessagesContext";

function AppSideBar() {
  const router = useRouter();
  const { setMessages } = useContext(MessagesContext) || {};

  const handleNewChat = () => {
    setMessages?.([]);
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-5 border rounded-xl">
        <FaBolt className="text-2xl m-1 text-blue-600" />
      </SidebarHeader>

      <SidebarContent className="p-5">
        <Button onClick={handleNewChat}>
          <MessageCircleCodeIcon /> Start New Chat
        </Button>

        <SidebarGroup>
          <WorkSpaceHistory />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
