import { chatSession } from "@/configs/AiModel";
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

    const result = await chatSession.sendMessage(prompt);

    if (!result?.response?.text) {
      return NextResponse.json(
        { error: "AI model did not return a valid response" },
        { status: 502 }
      );
    }

    const AIResp = await result.response.text();

    return NextResponse.json({ result: AIResp });
  } catch (e) {
    console.error("[API] Error:", e);
    return NextResponse.json(
      { error: e?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
 