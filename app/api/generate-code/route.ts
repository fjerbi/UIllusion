import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_TOKEN!,
    baseURL: "https://openrouter.ai/api/v1/",
});

export const config = {
    api: {
        bodyParser: true,
    },
};

interface RequestBody {
    imageUrl: string;
    outputFormat: "jsx" | "html";
}


const timeoutPromise = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), ms));

interface ApiResponse {
    choices: Array<{
        message: {
            content: string;
        };
    }>;
}

const timeoutDuration = 30000; // Increased timeout to 30 seconds

export async function POST(request: Request): Promise<Response> {
    if (request.method !== "POST") {
        return new Response(JSON.stringify({ message: "Method not allowed" }), { status: 405 });
    }

    try {
        const body: RequestBody = await request.json();
        const { imageUrl, outputFormat } = body;

        if (!imageUrl) {
            return new Response(JSON.stringify({ message: "No image URL provided" }), { status: 400 });
        }

        const systemPrompt =
            outputFormat === "jsx"
                ? "You are an AI Coding Assistant that generates UI JSX and Tailwind CSS code based on a given wireframe. Do not Include Images, replace them with placeholder images. Provide the whole component with all imports."
                : "You are an AI Coding Assistant that generates HTML and CSS code based on a given wireframe. Do not Include Images, replace them with placeholder images. Provide the whole component with all imports.";

        const apiResponse = await Promise.race([
            openai.chat.completions.create({
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
            }),
            timeoutPromise(timeoutDuration),
        ]);

        const typedApiResponse = apiResponse as ApiResponse;
        const script: string = typedApiResponse.choices[0]?.message?.content?.trim() || "No script generated";
        const preview: string = outputFormat === "jsx" ? `<html><body>${script}</body></html>` : script;

        return new Response(JSON.stringify({ script, preview }), { status: 200 });
    } catch (error: unknown) {
        console.error("Error generating code:", error);
        if (error instanceof Error) {
            console.error("Error stack:", error.stack);
        }
        return new Response(
            JSON.stringify({ message: "Error generating code", error: (error as Error).message }),
            { status: 500 }
        );
    }
}