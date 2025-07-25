import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'prompt'" },
        { status: 400 }
      );
    }

    console.log("[API] prompt:", prompt);

    const result = await GenAiCode.sendMessage(prompt);

    console.log("[API] result:", result);

    if (!result || !result.response) {
      console.error("[API] No response from AI model");
      return NextResponse.json(
        { error: "No response from AI model" },
        { status: 502 }
      );
    }

    const response = result.response;

    let data;

    if (typeof response.text === "function") {
      // response is a fetch-like Response
      const respText = await response.text();
      console.log("[API] respText:", respText);

      try {
        data = JSON.parse(respText);
      } catch {
        console.error("[API] Failed to parse JSON from AI response");
        return NextResponse.json(
          { error: "Failed to parse JSON from AI response" },
          { status: 502 }
        );
      }
    } else if (typeof response === "object") {
      // already a JS object
      data = response;
    } else {
      console.error("[API] Unexpected response type:", typeof response);
      return NextResponse.json(
        { error: "Unexpected response type from AI model" },
        { status: 502 }
      );
    }

    console.log("[API] Final data:", data);
    return NextResponse.json(data);
  } catch (e) {
    console.error("[API] Exception:", e);
    return NextResponse.json(
      {
        error: e.message || "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
