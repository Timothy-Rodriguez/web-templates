import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's snow theme CSS

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && !editorRef.current) {
      // Initialize Quill
      editorRef.current = new Quill(quillRef.current, {
        theme: "snow", // Use the snow theme
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["clean"], // Remove formatting
          ],
        },
        placeholder: "Write something amazing...",
      });

      // Update parent component on content change
      editorRef.current.on("text-change", () => {
        const content = editorRef.current?.root.innerHTML || "";
        onChange(content);
      });
    }
  }, [onChange]);

  // Update editor content when `value` prop changes
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.root.innerHTML) {
      editorRef.current.root.innerHTML = value;
    }
  }, [value]);

  return <div ref={quillRef} className="quill-editor" />;
};

export default QuillEditor;