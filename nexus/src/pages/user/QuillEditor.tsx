import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && !editorRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }], // Headers
            [{ font: [] }], // Font family
            [{ size: ["small", false, "large", "huge"] }], // Font size
            ["bold", "italic", "underline", "strike"], // Basic formatting
            [{ color: [] }, { background: [] }], // Text color and background color
            [{ align: [] }], // Text alignment
            ["link", "image"], // Link and image
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            ["clean"], // Remove formatting
          ],
        },
        placeholder: "Write something amazing...",
      });

      editorRef.current.on("text-change", () => {
        const content = editorRef.current?.root.innerHTML || "";
        onChange(content);
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.root.innerHTML) {
      editorRef.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={quillRef} className="quill-editor" />;
};

export default QuillEditor;