import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import React from "react";
import { Button } from "../button";

function PricingModel() {
  return (
    <div className="mt-3 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div
          key={index}
          style={{
            backgroundColor: Colors.BACKGROUND,
          }}
          className="border rounded-lg p-4"
        >
          <h2 className="font-bold text-2xl mb-2">{pricing.name}</h2>
          <h2 className="font-medium text-lg">{pricing.tokens}</h2>
          <p>{pricing.desc || "Description here"}</p>
          <h2 className="mt-6  text-2xl font-bold">
            ₹{pricing.price ?? "0"}
          </h2>
          <Button className="mt-2 bg-gradient-to-l from-green-900 via-green-800 to-green-600 text-white">Upgrade to {pricing.name}</Button>
        </div>
      ))}
    </div>
  );
}

export default PricingModel;
