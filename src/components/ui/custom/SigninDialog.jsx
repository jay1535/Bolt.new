"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../button";
import { useGoogleLogin } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import uuid4 from "uuid4";

function SigninDialog({ openDialog, closeDialog }) {
  const { setUserDetails } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const user = userInfo.data;

        await CreateUser({
          name: user?.name,
          email: user?.email,
          picture: user?.picture,
          uid: uuid4(),
        });

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user));
        }

        setUserDetails(user);
        closeDialog(false);
      } catch (err) {
        console.error("Sign-in failed:", err);
        alert("Something went wrong during sign-in. Please try again.");
      }
    },
    onError: (errorResponse) => {
      console.error("Google Login error:", errorResponse);
      alert("Google sign-in failed. Please try again.");
    },
  });

  if (!isClient) return null; // SSR-safe

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="font-bold text-xl text-center text-blue-600">
            {Lookup.SIGNIN_HEADING}
          </h2>

          <p className="mt-2 text-center text-lg">
            {Lookup.SIGNIN_SUBHEADING}
          </p>

          <Button
            className="text-white mt-3 flex items-center 
                bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800"
            onClick={googleLogin}
          >
            Sign in with Google
          </Button>

          <p className="text-sm text-gray-500 mt-2">
            {Lookup.SIGNIn_AGREEMENT_TEXT}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SigninDialog;
