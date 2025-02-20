import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  Sandpack,
} from "@codesandbox/sandpack-react";

const CodePreview = ({ script }: { script: string }) => {
  return (
    <Sandpack
      template="react"
      theme="dark"
      options={{
        externalResources: ["https://cdn.tailwindcss.com"],
        showLineNumbers: false, // default - true
        showInlineErrors: true, // default - false
        wrapContent: true, // default - false
        editorHeight: 600, // default - 300
        editorWidthPercentage: 60, // default - 50
      }}
      files={{
        "/App.js":
          script ||
          `export default function App() { return <h1>Generated Code Here</h1>; }`,
        "/index.js": `import React from "react"; import { createRoot } from "react-dom/client"; import App from "./App"; createRoot(document.getElementById("root")).render(<App />);`,
      }}
    >
      <SandpackProvider>
        <SandpackLayout>
          <SandpackCodeEditor />
          <SandpackPreview />
        </SandpackLayout>
      </SandpackProvider>
    </Sandpack>
  );
};

export default CodePreview;
