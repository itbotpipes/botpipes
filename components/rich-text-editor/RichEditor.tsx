"use client";

import clsx from "clsx";
import React from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./MenuBar";

interface RichEditorProps {
  className?: string;
  onValueChange?: (value: JSONContent) => void;
  onValidChange?: (isValid: boolean) => void;
  onRawValueChange?: (value: string) => void;
  defaultValue?: string;
}

const RichEditor: React.FC<RichEditorProps> = ({
  className,
  onValueChange,
  onValidChange,
  onRawValueChange,
  defaultValue,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-5",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-5",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
    ],
    content: (() => {
      if (!defaultValue) {
        return {
          type: "doc",
          content: [],
        };
      }
      try {
        return JSON.parse(defaultValue);
      } catch {
        return {
          type: "doc",
          content: [],
        };
      }
    })(),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: clsx(
          "min-h-[150px] border rounded-md bg-slate-50 py-2 px-3",
          "[&>h1]:text-4xl [&>h2]:text2xl [&>h3]:text-xl [&>h1,h2,h3]:font-bold",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      if (onValueChange) onValueChange(editor.getJSON());
      const text = editor.getText().trim();
      onValidChange?.(text.length > 0);
      if (onRawValueChange) onRawValueChange(text);
    },
  });

  return (
    <div className={clsx("rich-editorjs max-w-[800px]", className)}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichEditor;
