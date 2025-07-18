"use client"
import PricingModel from "@/components/ui/custom/PricingModel";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import React, { useContext } from "react";

function Pricing() {
  const {userDetails, setUserDetails} = useContext(UserDetailContext);
  return (
    <div className="mt-5 flex flex-1 flex-col items-center  text-center min-h-screen p-10 md:p-32 lg:px-48">
      
        <h2 className="font-bold text-5xl mb-4">
          Pricing
        </h2>
        <p className="max-w-xl text-lg text-gray-300">
          {Lookup.PRICING_DESC}
        </p>
        <div style={{
          backgroundColor:Colors.BACKGROUND
        }}className="mt-3 p-4 border rounded-xl w-full flex justify-between">
          <h2 className="text-lg ">
           
            <span  className="font-bold">
              {userDetails?.token+" "} 
            </span>
              tokens left.
          </h2>
          <div >
            <h2 className="font-medium">
              Need mor tokens?
            </h2>
            <p>
              Upgrade Your plan below.
            </p>
          </div>
        </div>
     <PricingModel/>
    </div>
  );
}

export default Pricing;
