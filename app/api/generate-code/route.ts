import { OpenAI } from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_TOKEN,
    baseURL: "https://openrouter.ai/api/v1/",
});

export const config = {
    api: {
        bodyParser: true, // Allow body parsing
    },
};

export async function POST(request: Request) {
    if (request.method !== "POST") {
        return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
    }

    try {
        const { imageUrl } = await request.json();

        if (!imageUrl) {
            return new Response(JSON.stringify({ message: "No image URL provided" }), { status: 400 });
        }

        const apiResponse = await openai.chat.completions.create({
            model: "google/gemini-2.0-pro-exp-02-05:free",
            messages: [
                {
                    role: "system",
                    content: "You are an AI Coding Assistant that generates UI JSX and Tailwindcss code based on a given wireframe without comment, just provide the code with only the div.",
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "You are an AI Coding Assistant that generates UI JSX and Tailwindcss code based on a given wireframe without comment, just provide the code with only the div.",
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

        const script = apiResponse.choices[0]?.message?.content?.trim() || 'No script generated';
        const preview = `<html><body>${script}</body></html>`;

        return new Response(JSON.stringify({ script, preview }), { status: 200 });

    } catch (error) {
        console.error("Error generating code:", error);
        return new Response(JSON.stringify({ message: "Error generating code", error: error.message }), { status: 500 });
    }
}
