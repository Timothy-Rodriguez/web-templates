import { useState } from "react";
import DOMPurify from "dompurify";
import QuillEditor from "./QuillEditor";

export default function Editor() {
  const [content, setContent] = useState<string>("");
  const [mode, setMode] = useState<"editor" | "preview">("editor");

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
    console.log("Editor content:", newContent);
  };

  const toggleMode = () => {
    setMode(mode === "editor" ? "preview" : "editor");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Rich Text Editor with Quill</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={toggleMode}
          style={{
            padding: "8px 16px",
            background: mode === "editor" ? "#007bff" : "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {mode === "editor" ? "Switch to Preview" : "Switch to Editor"}
        </button>
      </div>
      <div className={`editor-wrapper ${mode === "editor" ? "visible" : "hidden"}`}>
        <QuillEditor value={content} onChange={handleEditorChange} />
      </div>
      {mode === "preview" && (
        <div
          className="quill-output"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      )}
    </div>
  );
}
