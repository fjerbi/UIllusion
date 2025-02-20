"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setScript } from "@/store/scriptSlice";
import { RootState } from "@/store/scriptSlice";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "react-loader-spinner";
import { Code2, Camera, Home } from "lucide-react";
import { motion } from "framer-motion";
import CodePreview from "../codePreview/_components/DemoPreview";


export default function Generate() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [outputFormat, setOutputFormat] = useState<"jsx" | "html">("jsx");
  const script = useSelector((state: RootState) => state.script.script);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = async () => {
    if (!imageUrl) return;
    setLoading(true);

    try {
      const response = await axios.post("/api/generate-code", {
        imageUrl,
        outputFormat,
      });
      let { script } = response.data;
      script = script
        .replace(/^```(jsx|html)/, "")
        .replace(/```$/, "")
        .trim();
      dispatch(setScript(script));
    } catch (error) {
      console.error("Error generating code:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-600 to-purple-400 text-white p-8">
      <motion.button
        onClick={handleHome}
        className="absolute top-4 left-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-xl hover:bg-purple-700 transition duration-300 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Home className="text-white" size={20} />
        Home
      </motion.button>

      <motion.h1
        className="text-5xl font-normal mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        ⿻ AI-Powered Wireframe Code Generator
      </motion.h1>

      <Input
        required={true}
        type="text"
        value={imageUrl}
        onChange={handleImageUrlChange}
        placeholder="Enter Wireframe Image URL"
        className="mb-4 w-96 p-2 bg-white text-purple-600 rounded-md shadow-lg"
      />

 
      <div className="mb-4 flex items-center gap-4 ">
        <label className="text-white">Output Format:</label>
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value as "jsx" | "html")}
          className="p-2 bg-white text-purple-600 rounded-md shadow-lg"
        >
          <option value="jsx">JSX + Tailwind CSS</option>
          <option value="html">HTML + CSS</option>
        </select>
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-purple-700 text-white px-6 py-3 rounded-lg shadow-xl hover:bg-purple-800 disabled:bg-purple-300 flex items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {loading ? (
          <>
            <ProgressBar
              height="24"
              width="24"
              ariaLabel="loading"
            />
            Generating...
          </>
        ) : (
          <>
            <Code2 />
            Generate Code
          </>
        )}
      </motion.button>

      {loading && (
        <motion.div
          className="mt-4 text-center text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <p>Loading...</p>
        </motion.div>
      )}

      <div className="mt-6 w-full max-w-6xl flex flex-col items-center space-y-6">
        {script && (
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Camera /> Generated Code (
              {outputFormat === "jsx" ? "JSX + Tailwind CSS" : "HTML + CSS"})
            </h2>
          
          </motion.div>
        )}

        {script && (
          <motion.div
            className="w-full max-w-6xl p-4 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Camera /> Preview
            </h2>
            <div className="h-full w-full overflow-auto">
              {outputFormat === "jsx" ? (
                <CodePreview script={script} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: script }} />
              )}
            </div>
          </motion.div>
        )}
      </div>

   
    </div>
  );
}