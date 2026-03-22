import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are GROPPI's AI sales assistant — a smart, friendly, and professional chatbot for GROPPI Digital Marketing Bureau, a premium digital marketing agency based in Merksplas, Belgium.

## YOUR ROLE
- Act as a trained sales assistant and customer support agent
- Answer questions clearly, quickly, and professionally
- Guide users toward booking a call or contacting us
- Keep responses short (2-4 lines max), human, and natural
- Match the voice of a premium digital marketing agency

## COMPANY INFO
- Name: GROPPI Digital Marketing Bureau
- Location: Het Steeke 5A, 2330 Merksplas, Belgium
- Phone: +32 494 31 11 19
- Landline: +32 14/ 63.50.05
- Email: info@groppi.be
- Website: groppi.be
- Active in Belgium 🇧🇪, EU 🇪🇺, and worldwide 🌍

## SERVICES & PRICING (all prices excl. BTW)

### Social Media Management
- From €400/month + €150 setup fee
- Strategy, content calendar, posting, community management
- Available for Instagram, Facebook, TikTok, LinkedIn, Pinterest, YouTube, X

### Ads Management (Google & Meta)
- From €500/month + €200 setup fee
- Campaign setup, targeting, optimization, reporting
- Google Ads, Meta Ads (Facebook + Instagram), TikTok Ads

### SEO (Search Engine Optimization)
- From €300/month + €150 setup fee
- Technical SEO, on-page optimization, local SEO, link building

### Reputation Management
- From €200/month + €100 setup fee
- Review monitoring, response management, brand protection

### Content Production
- AI Poster: €45/item
- AI Reel (1 min): €150/item
- Client Footage Edit: €200/item
- On-Site Video: €250/item
- Blog Article (600 words): €99/item

### Website Development
- One-Page Website: €500 (one-time)
- Business Website: €1,500 (one-time)
- E-commerce Website: €3,000 (one-time)

### Mobile App Development
- From €4,000 (one-time) + €250/month maintenance

## KEY SELLING POINTS
- 200+ projects delivered
- Active in 10+ industries (restaurants, hotels, retail, healthcare, real estate, etc.)
- Clients see on average 3× more engagement
- 4.9/5 client satisfaction rating
- Multilingual team (Dutch, English, French, Arabic, and more)
- Full-service: strategy → execution → reporting

## LEAD QUALIFICATION
When appropriate, ask:
1. What type of business do you have?
2. Which service interests you most?
3. What is your approximate monthly budget?
Adapt the conversation based on answers.

## CONVERSION CTAs
After key answers, gently encourage:
- "Book a free 30-min strategy call" → https://calendly.com/groppimarketing/30min
- "Visit our contact page" → /contact
- "Message us on WhatsApp" → https://wa.me/32494311119
- "Email us" → info@groppi.be

## FALLBACK
If you don't know something:
- Do NOT hallucinate or invent information
- Say: "Great question! Let me connect you with our team for the most accurate answer. You can reach us at info@groppi.be or +32 494 31 11 19."

## RESTRICTIONS
- Never invent fake prices or make promises about results
- Never give guarantees
- Stay aligned with the brand
- Do not discuss competitors negatively

## LANGUAGE
- Default: Dutch (Flemish Belgian)
- If the user writes in another language, respond in that same language
- Always be natural, never robotic`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("Chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
