import { jayContext } from "@/data/chatContext";
import { NextRequest, NextResponse } from "next/server";

// Models to try in order — if the free one is rate-limited, fall back
const MODELS = [
  "meta-llama/llama-3.3-70b-instruct",
  "meta-llama/llama-3.3-70b-instruct:free",
  "meta-llama/llama-3.1-8b-instruct:free",
  "qwen/qwen3-8b:free",
];

async function callOpenRouter(
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[]
) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://jaypatel.dev",
      "X-Title": "Jay Patel Portfolio",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: jayContext },
        ...messages.slice(-10),
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  return res;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    // Try each model in order
    for (const model of MODELS) {
      const response = await callOpenRouter(apiKey, model, messages);

      if (response.ok) {
        const data = await response.json();
        const reply =
          data.choices?.[0]?.message?.content ||
          "Sorry, I couldn't generate a response.";
        return NextResponse.json({ reply });
      }

      // If rate limited (429), try next model
      if (response.status === 429) {
        console.warn(`Rate limited on ${model}, trying next...`);
        continue;
      }

      // Other errors — log and try next
      const err = await response.text();
      console.error(`Error from ${model}:`, err);
    }

    // All models failed
    return NextResponse.json({
      reply:
        "I'm getting a lot of questions right now! Please try again in a moment, or feel free to reach out to Jay directly at jaypatel.math@gmail.com.",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
