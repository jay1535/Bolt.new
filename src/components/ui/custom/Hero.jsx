"use client";

import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Menu } from "lucide-react";
import React, { useContext, useState } from "react";
import SigninDialog from "./SigninDialog";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

function Hero() {
  const [userInput, setUserInput] = useState("");
  const { setMessages } = useContext(MessagesContext);
  const { userDetails } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const onGenerate = async (input) => {
    if (!input?.trim()) return;

    if (!userDetails?.name) {
      setOpenDialog(true);
      return;
    }

    const msg = {
      role: "user",
      context: input,
    };
    setMessages([msg]);

    const workspaceId = await CreateWorkspace({
      user: userDetails?._id,
      messages: [msg],
    });

    router.push("/workspace/" + workspaceId);
  };

  return (
    <div className="relative mt-5 flex flex-1 flex-col items-center justify-center text-center md:p-50  xl:pl-100 xl:pt-50">
    
        <h2 className="font-bold text-3xl">{Lookup.HERO_HEADING}</h2>
        <p className="text-gray-400 font-medium mt-2">{Lookup.HERO_DESC}</p>

        {/* Input Area */}
        <div
          style={{ backgroundColor: Colors.BACKGROUND }}
          className="animate-borderGlow p-5 border border-blue-800 rounded-xl max-w-2xl w-full shadow-[0_0_10px_rgba(59,130,246,0.7)] transition duration-300 mt-6"
        >
          <div className="flex gap-2">
            <textarea
              className="outline-none bg-transparent w-full h-20 max-h-56 resize-none flex-1"
              placeholder={Lookup.INPUT_PLACEHOLDER}
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onGenerate(userInput);
                }
              }}
            />
            {userInput && (
              <ArrowRight
                onClick={() => onGenerate(userInput)}
                className="bg-gradient-to-t from-blue-600 to-blue-900 p-2 h-8 w-8 rounded-md cursor-pointer"
              />
            )}
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap max-w-2xl justify-center mt-4">
          {Lookup?.SUGGSTIONS.map((suggestion, index) => (
            <h2
              onClick={() => onGenerate(suggestion)}
              key={index}
              className="px-3 py-1 border rounded-full m-1 text-sm text-gray-500 hover:text-white cursor-pointer"
            >
              {suggestion}
            </h2>
          ))}
        </div>
     

      {/* Sidebar Toggle Button (now on right) */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-700 p-2 rounded-full shadow-md"
      >
        <Menu className="text-white w-5 h-5" />
      </button>

      {/* Sign In Dialog */}
      <SigninDialog
        openDialog={openDialog}
        closeDialog={(v) => setOpenDialog(v)}
      />
    </div>
  );
}

export default Hero;  