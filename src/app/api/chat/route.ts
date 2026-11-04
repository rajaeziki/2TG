import { NextResponse } from "next/server";
import { PHONES } from "@/data/site";

export const runtime = "nodejs";

// Any OpenAI-compatible endpoint works. Default: Pollinations (free, no key).
// For a more reliable free tier, set CHAT_API_URL / CHAT_API_KEY / CHAT_MODEL (see .env.local.example).
const API_URL = process.env.CHAT_API_URL ?? "https://text.pollinations.ai/openai";
const API_KEY = process.env.CHAT_API_KEY;
const MODEL = process.env.CHAT_MODEL ?? "openai";

const LANG_NAME: Record<string, string> = { en: "English", fr: "French", ar: "Arabic" };

// Tiny in-memory limiter: 20 messages per IP per 10 minutes.
const hits = new Map<string, { n: number; reset: number }>();
function limited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { n: 1, reset: now + 10 * 60_000 });
    return false;
  }
  h.n += 1;
  return h.n > 20;
}

type Msg = { role: "user" | "assistant"; content: string };

function systemPrompt(lang: string) {
  return [
    "You are the friendly assistant of 2TG Business Services, a staffing agency in Agadir and Dar Bouazza (Morocco).",
    "The agency places cleaners, nannies, cooks and drivers with households and businesses, full-time or part-time.",
    `Contact phones: ${PHONES.join(" / ")}. Customers can also use the quote form on this page or WhatsApp.`,
    `Reply in ${LANG_NAME[lang] ?? "English"} unless the user writes in another language; then match theirs.`,
    "Keep answers short (2-4 sentences), warm and professional.",
    "Never state exact prices, salaries, availability, guarantees or candidate details: you do not have them.",
    "For prices or hiring, invite the user to fill the quote form or message 2TG on WhatsApp, where the team confirms everything.",
    "If asked about anything unrelated to 2TG's services, politely steer back.",
  ].join("\n");
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ error: "rate" }, { status: 429 });

  let body: { messages?: Msg[]; lang?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad" }, { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));
  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "bad" }, { status: 400 });
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(API_KEY ? { Authorization: `Bearer ${API_KEY}` } : {}) },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 300,
        messages: [{ role: "system", content: systemPrompt(body.lang ?? "en") }, ...messages],
      }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
    const data = await res.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;
    if (!reply) return NextResponse.json({ error: "empty" }, { status: 502 });
    return NextResponse.json({ reply: reply.trim() });
  } catch {
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
