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
                : "You are an AI Coding Assistant that generates HTML and CSS code based on a given wireframe.Do not Include Images, replace them with placeholder images. Provide the whole component with all imports.";

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

        const script: string = apiResponse.choices[0]?.message?.content?.trim() || "No script generated";
        const preview: string = outputFormat === "jsx" ? `<html><body>${script}</body></html>` : script;

        return new Response(JSON.stringify({ script, preview }), { status: 200 });
    } catch (error: unknown) {
        // Type assertion to Error object
        const typedError = error as Error;
        // Log detailed error information
        console.error('Error details:', typedError.response || typedError.message || typedError);

        return new Response(
            JSON.stringify({ message: "Error generating code", error: typedError.message }),
            { status: 500 }
        );
    }
}
