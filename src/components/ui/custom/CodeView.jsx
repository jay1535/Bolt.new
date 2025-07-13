"use client";
import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";



function CodeView() {
  const [activeTab, setActiveTab] =useState("preview");
  return (
    <div className="border-none rounded-2xl">
      <div className="bg-[#181818] w-full p-2 border rounded-lg">
        <div className="flex items-center justify-center flex-wrap shrink-0 bg-gray-900 p-1 w-[140px] border rounded-full gap-3 ">
          <h2 
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer
             ${activeTab=='code'&&'text-blue-600  p-1 px-2 rounded-full'} `}>Code</h2>
          <h2 
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer 
            ${activeTab=='preview'&&'text-blue-600  p-1 px-2 rounded-full'}`}>Preview</h2>
        </div>
      </div>
      <SandpackProvider template="react" theme={"dark"}>
        <SandpackLayout  style={{
      borderRadius: "0.5rem", 
      overflow: "hidden",    
      border: "1px solid #333"
    }}>
      {activeTab === "code"?
      <>
          <SandpackFileExplorer
            style={{
              height: "77vh",
            }}
          />
          <SandpackCodeEditor
            style={{
              height: "77vh",
            }}
          />
          </>:
          <>
          <SandpackPreview
            style={{
              height: "77vh",
            }}
          />
          </>}
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

export default CodeView;
