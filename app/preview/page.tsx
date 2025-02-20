"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/scriptSlice"; 
import JsxParser from "react-jsx-parser";
import { useState, useEffect } from "react";

export default function Preview() {

  const jsxCode = useSelector((state: RootState) => state.script.script);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (jsxCode) {
      setIsLoading(false);
    }
  }, [jsxCode]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <JsxParser jsx={jsxCode} key={jsxCode} />
      )}
    </>
  );
}
