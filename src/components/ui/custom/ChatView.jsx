"use client";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { MessagesContext } from "@/context/MessagesContext";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import { ArrowRight, Loader2Icon } from "lucide-react";
import Lookup from "@/data/Lookup";
import axios from "axios";
import Prompt from "@/data/Prompt";
import ReactMarkdown from "react-markdown";
import { useSidebar } from "../sidebar";

function ChatView() {
  const { id } = useParams();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetails,setUserDetails } = useContext(UserDetailContext);
  const UpdateMessages= useMutation(api.workspace.UpdateMessages);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const {toggleSidebar} = useSidebar();

  // fetch workspace data when id changes
  useEffect(() => {
    if (id) GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages || []);
    console.log("workspace data", result);
  };

  // trigger AI response when a user message is added
  useEffect(() => {
    if (messages?.length > 0) {
      const lastRole = messages[messages.length - 1].role;
      if (lastRole === "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const GetAiResponse = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + Prompt.CHAT_PROMPT;

    try {
      const result = await axios.post("/api/ai-chat", {
        prompt: PROMPT,
      });

      console.log("AI response:", result.data);

      let aiText = "No response";

      if (result?.data?.result) {
        if (typeof result.data.result === "string") {
          aiText = result.data.result;
        } else if (typeof result.data.result.text === "string") {
          aiText = result.data.result.text;
        } else {
          aiText = JSON.stringify(result.data.result);
        }
      } else {
        aiText = JSON.stringify(result.data);
      }
    const aiResp = {
        role: "ai",
        context: aiText,
      };
      setMessages((prev) => [
        ...prev,
       aiResp,
      ]);
      await UpdateMessages({
      workspaceId: id,
      messages: [...messages, aiResp],
    });
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "ai", context: "Error: Could not generate response." },
      ]);
    }
    
    setLoading(false);
  };

  const onGenerate = (input) => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        context: input,
      },
    ]);

    setUserInput("");
  };

  return (
    <div className="flex">
  {/* Sidebar */}
  <div
    className="flex flex-col justify-end items-center w-15 h-full p-2"
    style={{ backgroundColor: "transparent" }}
  >
    {userDetails && (
      <Image
      onClick={toggleSidebar}
        src={userDetails.picture}
        alt="UserPicture"
        width={30}
        height={30}
        className="rounded-full mb-2"
      />
    )}
  </div>


    <div className="relative h-[85vh]  flex flex-col flex-1">
      {/* Messages */}
      <div className="flex-1 overflow-y-scroll mb-2 px-2">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className="p-3 rounded-lg mb-2 flex gap-2 items-start leading-7"
            style={{
              backgroundColor: Colors.BACKGROUND,
            }}
          >
            {msg?.role === "user" && userDetails?.picture && (
              <Image
                src={userDetails.picture}
                alt="user"
                width={35}
                height={35}
                className="rounded-lg"
              />
            )}
            <h2 className='flex flex-col'>
            <ReactMarkdown>{msg?.context || "No content"}</ReactMarkdown>
            </h2>
          </div>
        ))}

        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-start"
            style={{
              backgroundColor: Colors.BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating response…</h2>
          </div>
        )}
      </div>


      {/* Input Section */}
      
      <div
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
        className="animate-borderGlow p-5 border border-blue-800 rounded-xl max-w-2xl mt-3 w-full shadow-[0_0_10px_rgba(59,130,246,0.7)] transition duration-300"
      >
        <div className="flex gap-2">
          <textarea
          
            className="outline-none bg-transparent w-full h-22 max-h-56 resize-none"
            placeholder={Lookup.INPUT_PLACEHOLDER}
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent newline
                onGenerate(userInput);
              }
            }}
          />
          {userInput.trim() && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-gradient-to-t from-blue-600 to-blue-900 p-2 h-8 w-14 
              rounded-md cursor-pointer"
            />
          )}
        </div>
      </div>
      
    </div>
    </div>
  
  );
}

export default ChatView;
