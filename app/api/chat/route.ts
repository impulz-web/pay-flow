import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Gemini client lazily to avoid startup crashes if the key is missing.
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `You are "FlowAI", the premium digital banking support assistant for PayFlow.
PayFlow is a cutting-edge fictional fintech digital banking platform operating globally, with a powerful local presence in Kenya.
We support seamless payment infrastructure, instant bank transfers, virtual multi-currency cards, and instant mobile money cash-out (M-Pesa, Airtel Money) in all 47 counties and major Kenyan cities, including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Ruiru, Kikuyu, Thika, Kakamega, and Malindi.

Keep all responses:
1. STRICTLY professional, helpful, concise, and elegant.
2. Formatted cleanly with simple paragraphs or bullet points.
3. ABSOLUTELY free of any emojis (the system restricts emojis). Use professional text formatting instead.
4. Fully detailed about PayFlow's Kenyan operations, local rates, zero hidden fees, security compliance with CBK (Central Bank of Kenya) guidelines, and international USD/KES remittance.

If asked about pricing, state:
- Personal Plan: Free basic banking, 1 free virtual debit card, instant transfers up to 50,000 KES per day.
- Business Plan: 999 KES / month ($9.99), multi-user access, API integrations, virtual cards, unlimited local bank and M-Pesa transfers.
- Enterprise Plan: Custom pricing, dedicated compliance, high-volume merchant processing.

If asked about cash-out/remittance speeds, indicate that transfers from USD wallets to local M-Pesa or bank accounts in Nairobi, Mombasa, Kisumu, etc., take less than 10 seconds.

Be confident and helpful. Do not mention that you are a language model or AI if possible; refer to yourself as the PayFlow Intelligent Assistant.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    const ai = getAiClient();
    if (!ai) {
      // Return a professional rule-based fallback response if the API key is not configured.
      const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let responseText = "Thank you for contacting PayFlow. Our services are fully functional across all major Kenyan cities, including Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret. You can instantly transfer funds, create virtual debit cards, and budget smarter with our deep navy and emerald green platform. Please configure your GEMINI_API_KEY in the Secrets panel to activate full conversation capabilities.";
      
      if (lastMessage.includes("fee") || lastMessage.includes("price") || lastMessage.includes("cost")) {
        responseText = "PayFlow features standard transparent pricing. The Personal account is completely free of charge. The Business account is 999 KES ($9.99) monthly, offering full invoicing and custom API integrations. Enterprise pricing is tailored based on transactional volume. There are absolutely no hidden charges for transfers between PayFlow users in Nairobi, Mombasa, or anywhere else.";
      } else if (lastMessage.includes("security") || lastMessage.includes("safe") || lastMessage.includes("lock")) {
        responseText = "Security is our highest priority at PayFlow. We employ military-grade end-to-end encryption, multi-factor authentication (MFA), real-time fraud monitoring, and biometric login security. We comply strictly with global PCI-DSS standards and local Central Bank of Kenya security protocols to safeguard your transactions.";
      } else if (lastMessage.includes("mpesa") || lastMessage.includes("m-pesa") || lastMessage.includes("kenya") || lastMessage.includes("shilling") || lastMessage.includes("kes")) {
        responseText = "PayFlow supports deep integration with Kenyan financial networks. You can cash-in and cash-out instantly via M-Pesa or standard local bank transfers (such as KCB, Equity, NCBA) across all Kenyan cities like Nairobi, Mombasa, Kisumu, and Nakuru. Currency conversion between USD and KES is processed with real-time institutional exchange rates.";
      }

      return NextResponse.json({ text: responseText });
    }

    // Format the conversation history for the new Google GenAI chat format
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    
    // Start chat with the system instructions configured
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    // Send the last user message to the chat
    const response = await chat.sendMessage({ message: lastUserMessage });
    
    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in PayFlow support chat API:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request. Please try again." },
      { status: 500 }
    );
  }
}
