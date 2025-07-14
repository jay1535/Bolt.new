"use client";
import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";



function CodeView() {
  const [activeTab, setActiveTab] =useState("preview");
  const [file, setFiles]=useState(Lookup?.DEFAULT_FILE)
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
      <SandpackProvider
      file ={file}
      template="react" theme={"dark"}
      customSetup={{
        dependencies:{
          ...Lookup.DEPENDANCY
        }
      }}
      options={{
        externalResources:['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4']
      }}
      >
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
          showNavigator={true}
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
