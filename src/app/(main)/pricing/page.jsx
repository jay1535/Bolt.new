"use client";

import PricingModel from "@/components/ui/custom/PricingModel";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import React, { useContext } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";

function Pricing() {
  const { userDetails } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();

  return (
    <div
      className="mt-5 flex flex-col items-center text-center min-h-screen p-6 md:p-16 lg:px-48 space-y-6 relative"
      style={{
        background: "linear-gradient(135deg, #000, #0a0a0a)",
        color: "#e5e5e5",
      }}
    >
      {/* Sidebar toggle via avatar */}
      <div className="absolute top-4 right-4">
        {userDetails?.picture && (
          <Image
            onClick={toggleSidebar}
            src={userDetails.picture}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer hover:scale-105 transition"
          />
        )}
      </div>

      <h2 className="font-bold p-10 text-5xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-gray-300">
        Pricing
      </h2>

      <p className="max-w-xl text-lg text-gray-300">
        {Lookup.PRICING_DESC}
      </p>

      <div
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
        className="mt-3 p-4 border rounded-xl w-full max-w-2xl flex flex-col md:flex-row justify-between gap-4 shadow-md"
      >
        <h2 className="text-lg">
          <span className="font-bold">{userDetails?.token ?? 0} </span>
          tokens left.
        </h2>

        <div className="text-right">
          <h2 className="font-medium text-green-300">Need more tokens?</h2>
          <p>Upgrade your plan below.</p>
        </div>
      </div>

      {/* Pricing Table / Cards */}
      <PricingModel />
    </div>
  );
}

export default Pricing;
