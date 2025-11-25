import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini Client
const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const generateTagline = async (visitorType: 'Corporate' | 'Government' | 'Startup' = 'Government'): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "Innovating India Through Technology";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a short, punchy, futuristic tagline (under 10 words) for 'Veth Analytics', a premium Indian IT and Government AI consultancy, tailored for a ${visitorType} audience. Focus on core offerings like GovTech, AI, and Big Data. Do not include quotes.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini tagline error:", error);
    return "Innovating India Through Technology";
  }
};

export const generateProjectInsight = async (projectTitle: string, category: string): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "Advanced analytics and digital transformation delivered.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a single sentence (max 20 words) describing the high-tech impact of a ${category} project titled "${projectTitle}". Use business-centric, futuristic language.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini insight error:", error);
    return "Advanced analytics and digital transformation delivered.";
  }
};

export const generatePoliticalInsight = async (serviceTitle: string): Promise<string> => {
    const ai = getAIClient();
    if (!ai) return "Leveraging data to decode voter intent and optimize campaign resources.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a concise, high-impact strategic insight (max 15 words) about the value of "${serviceTitle}" in modern Indian elections. Professional, analytical tone.`,
        });
        return response.text.trim();
    } catch (error) {
        return "Leveraging data to decode voter intent and optimize campaign resources.";
    }
};

export const generateTeamBio = async (name: string, role: string): Promise<string> => {
    const ai = getAIClient();
    if (!ai) return `${name} is a visionary leader in ${role} with over a decade of experience driving digital transformation.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a professional, premium 2-sentence bio for ${name}, the ${role} at a high-end AI consultancy. Emphasize expertise and leadership.`,
        });
        return response.text.trim();
    } catch (error) {
        return `${name} is a visionary leader in ${role} with over a decade of experience driving digital transformation.`;
    }
}

export const generateMissionInsight = async (): Promise<string> => {
    const ai = getAIClient();
    if (!ai) return "Empowering society through sustainable and scalable artificial intelligence solutions.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Generate a single visionary sentence about the future of AI in governance and society. Abstract and inspiring.",
        });
        return response.text.trim();
    } catch (error) {
        return "Empowering society through sustainable and scalable artificial intelligence solutions.";
    }
}

export const generateTimelineInsight = async (year: string, title: string): Promise<string> => {
    const ai = getAIClient();
    if (!ai) return `A defining moment in ${year} that solidified our commitment to technological excellence and national growth.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Provide a 2-sentence elaborated context for a corporate milestone: Year ${year}, Title "${title}". Professional and impressive tone.`,
        });
        return response.text.trim();
    } catch (error) {
        return `A defining moment in ${year} that solidified our commitment to technological excellence and national growth.`;
    }
}

export const generateTestimonialSummary = async (client: string, review: string): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "A partnership that delivered exceptional value and scalability.";

  try {
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Summarize this client review from ${client} into a single, punchy impact statement (max 12 words) highlighting the outcome. Review: "${review}"`,
      });
      return response.text.trim();
  } catch (error) {
      return "A partnership that delivered exceptional value and scalability.";
  }
}

export const streamChatResponse = async function* (history: { role: string; parts: { text: string }[] }[], newMessage: string) {
  const ai = getAIClient();
  if (!ai) {
    yield "I am currently offline. Please configure the API Key to enable my intelligence.";
    return;
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: "You are 'Veth AI', the advanced assistant for Veth Analytics. You are professional, concise, and knowledgeable about IT, Government projects, and AI. Tone: Premium, helpful, futuristic.",
      },
      history: history,
    });

    const result = await chat.sendMessageStream({ message: newMessage });

    for await (const chunk of result) {
        yield chunk.text;
    }
  } catch (error) {
    console.error("Chat error:", error);
    yield "I encountered a disturbance in the digital field. Please try again.";
  }
};