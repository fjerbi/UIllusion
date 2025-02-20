"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/scriptSlice";
import JsxParser from "react-jsx-parser";
import { useState, useEffect } from "react";

export default function Preview() {
  const script = useSelector((state: RootState) => state.script.script); 
  const [isLoading, setIsLoading] = useState(true);
  const [isJsx, setIsJsx] = useState(false); 

  useEffect(() => {
    if (script) {
      setIsLoading(false);

     
      const isJsxScript = script.trim().startsWith("<div") && script.includes("className=");
      setIsJsx(isJsxScript);
    }
  }, [script]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div>Loading...</div>
        </div>
      ) : isJsx ? (
     
        <JsxParser jsx={script} key={script} />
      ) : (
      
        <div dangerouslySetInnerHTML={{ __html: script }} />
      )}
    </div>
  );
}