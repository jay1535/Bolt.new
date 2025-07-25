import ChatView from "@/components/ui/custom/ChatView";
import CodeView from "@/components/ui/custom/CodeView";
import React from "react";

function Workspace() {
  return (
    <div className="p-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <ChatView />
        <div className="col-span-3">
        <CodeView />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
