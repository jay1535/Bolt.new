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
import { useConvex, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import axios from "axios";
import { Loader } from "lucide-react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { ActionContext } from "@/context/ActionContext";



function CodeView() {
  const [activeTab, setActiveTab] =useState("code");
  const [files, setFiles]=useState(Lookup?.DEFAULT_FILE)
  const {messages,setMessages} = useContext(MessagesContext)
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const  {id} = useParams();
  const convex = useConvex()
  const [loading, setLoading] = useState(false);
  const { userDetails,setUserDetails } = useContext(UserDetailContext);
  const UpdateToken = useMutation(api.users.UpdateToken);
   const {action, setAction} = useContext(ActionContext)

  useEffect (()=>{
id&&GetFiles();
  },[id])
useEffect(()=>{
setActiveTab('preview')
},[action])
const GetFiles=async ()=>{
  setLoading(true)
  const result = await convex.query(api.workspace.GetWorkspace,{
    workspaceId:id
  })
  const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
  setFiles(mergedFiles);
  setLoading(false)
}
 useEffect(() => {
     if (messages?.length > 0) {
       const role = messages[messages.length - 1].role;
       if (role === "user") {
         GenerateAiCode(); 
       }
     }
   }, [messages]);

 const GenerateAiCode = async () => {
  setLoading(true)
  setActiveTab('code')
  const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
  const result = await axios.post('/api/gen-ai-code', {
    prompt: PROMPT
  });
  console.log("AI Response:", result.data);
  const aiResp = result.data;

  // Merge and wrap properly
  const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };
  setFiles(mergedFiles);

  await UpdateFiles({
    workspaceId: id,
    files: aiResp?.files,
  });
   const token = Number(userDetails?.token) - Number(countToken(JSON.stringify(aiResp)));
      setUserDetails(prev=>( {...prev, token: token}))
      await UpdateToken({
        token: token,
        userId: userDetails?._id
      })
      setActiveTab('preview')
  setLoading(false)
};


  return (
    <div className="border-none rounded-2xl relative">
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
      files ={files}
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
        <SandpackPreviewClient/>
          </>}
        </SandpackLayout>
      </SandpackProvider>
    {loading &&  <div className="p-10 bg-black opacity-80 absolute top-0 rounded-lg w-full h-full flex items-center justify-center">
        <Loader 
        className="animate-spin h-7 w-7 m-2 text-white"
        style={{ animationDuration: "2.5s" }}/>
        <h2 className="text-white">Generating Files....</h2>
      </div>}
    </div>
  );
}

export default CodeView; 