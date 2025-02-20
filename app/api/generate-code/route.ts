import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_TOKEN,
  baseURL: "https://openrouter.ai/api/v1/",
});

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(request: Request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
  }

  try {
    const { imageUrl, outputFormat } = await request.json(); 

    if (!imageUrl) {
      return new Response(JSON.stringify({ message: "No image URL provided" }), { status: 400 });
    }

    
    const systemPrompt =
      outputFormat === "jsx"
        ? "You are an AI Coding Assistant that generates UI JSX and Tailwind CSS code based on a given wireframe. Provide only the code without comments, starting and ending with a div."
        : "You are an AI Coding Assistant that generates HTML and CSS code based on a given wireframe. Provide only the code without comments, starting and ending with a div.";

    const apiResponse = await openai.chat.completions.create({
      model: "google/gemini-2.0-pro-exp-02-05:free",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Generate ${outputFormat === "jsx" ? "JSX + Tailwind CSS" : "HTML + CSS"} code for this wireframe.`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
    });

    const script = apiResponse.choices[0]?.message?.content?.trim() || "No script generated";
    const preview = outputFormat === "jsx" ? `<html><body>${script}</body></html>` : script;

    return new Response(JSON.stringify({ script, preview }), { status: 200 });
  } catch (error) {
    console.error("Error generating code:", error);
    return new Response(
      JSON.stringify({ message: "Error generating code", error: error.message }),
      { status: 500 }
    );
  }
}