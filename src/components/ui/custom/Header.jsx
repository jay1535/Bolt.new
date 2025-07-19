"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Rocket, Download } from "lucide-react"; // Lucide icons
import { Button } from "../button";
import { UserDetailContext } from "@/context/UserDetailContext";
import SigninDialog from "./SigninDialog";
import Image from "next/image";
import { ActionContext } from "@/context/ActionContext";

function Header() {
  const { userDetails } = useContext(UserDetailContext);
  const router = useRouter();
  const {action, setAction} = useContext(ActionContext);

  const [showSignIn, setShowSignIn] = useState(false);
  const onAction=(action)=>{
 setAction({
  actionType:action,
  timeStamp:Date.now()
 })
  }

  const handleGetStarted = () => {
    if (!userDetails?.name) {
      setShowSignIn(true);
    } else {
      router.push("/dashboard");
    }
  };

 

  return (
    <div
      className="p-2 flex items-center justify-between w-full"
      style={{ background: "transparent" }}
    >
      {/* Left: Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Zap className="w-6 h-6 text-blue-600" />
        <span className="font-bold text-lg">Bolt.new</span>
      </div>

      {/* Right: Buttons or User Info */}
      <div className="flex gap-4 items-center">
        {!userDetails?.name ? (
          <>
            <Button variant="ghost" onClick={() => setShowSignIn(true)}>
              Sign In
            </Button>
            <Button
              className="text-white bg-gradient-to-l from-blue-500 via-blue-600 to-blue-900"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="text-white flex gap-1 items-center"
              onClick={()=>{
                onAction('export')
              }}
            >
              <Download className="w-4 h-4"  /> Export
            </Button>
            <Button
              variant="outline"
              className="border-blue-600 bg-gradient-to-l from-blue-900 via-blue-800 to-blue-600 text-white flex gap-1 items-center"
                onClick={()=>{
                onAction('deploy')
              }}
            >
              <Rocket className="w-4 h-4" /> Deploy
            </Button>

            {userDetails?.picture && (
              <Image
                src={userDetails.picture}
                alt="User"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
                onClick={() => router.push("/settings")}
              />
            )}
          </>
        )}
      </div>

      {/* Signin Dialog */}
      <SigninDialog openDialog={showSignIn} closeDialog={setShowSignIn} />
    </div>
  );
}

export default Header;
