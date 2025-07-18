"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { FaBolt } from "react-icons/fa6";
import { Button } from "../button";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Github, Linkedin, Instagram } from "lucide-react";
import SigninDialog from "./SigninDialog";

function Header({ isHeroPage }) {
  const { userDetails } = useContext(UserDetailContext);
  const router = useRouter();

  const [showSignIn, setShowSignIn] = useState(false);

  const handleGetStarted = () => {
    if (!userDetails?.name) {
      setShowSignIn(true);
    } else {
      router.push("/dashboard"); // or /app
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
        <FaBolt className="text-2xl text-blue-600" />
        <span className="font-bold text-lg">Bolt.new</span>
      </div>

      {/* Right: Buttons or Social Links */}
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
            {isHeroPage && (
              <>
                <a
                  href="https://github.com/your-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/your-linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/your-instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </>
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
