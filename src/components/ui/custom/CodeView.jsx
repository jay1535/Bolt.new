"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";



function CodeView() {
  const [activeTab, setActiveTab] =useState("");
  const [file, setFiles]=useState(Lookup?.DEFAULT_FILE)
  const {messages,setMessages} = useContext(MessagesContext)
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const  {id} = useParams();


 useEffect(() => {
     if (messages?.length > 0) {
       const lastRole = messages[messages.length - 1].role;
       if (lastRole === "user") {
         GenerateAiCode();
       }
     }
   }, [messages]);

  const GenerateAiCode =async()=>{
    
    const PROMPT = JSON.stringify(messages)+" "+ Prompt.CODE_GEN_PROMPT;
    const result = await axios.post('/api/gen-ai-code',{
      prompt: PROMPT
    })
    console.log(result.data);
    const aiResp=result.data;

    const mergeFiles = {...Lookup.DEFAULT_FILE, ...aiResp?.files};
    setFiles(mergeFiles);
     await UpdateFiles(aiResp?.files, {
      workspaceId: id,
      files: aiResp?.files
    });

  }

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
      files ={file}
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
