"use client";

import clsx from "clsx";
import React from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

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

  Highlight,

  Underline,

  Link.configure({
    openOnClick: false,
  }),

  Image,

  TextStyle,

  Color,

  CharacterCount,

  Placeholder.configure({
    placeholder: "Start writing your blog content...",
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
          "min-h-[500px] border rounded-xl bg-white px-6 py-5 focus:outline-none",
          "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:my-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:my-2",
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
      <div className="mt-2 flex justify-between text-sm text-gray-500">
  <span>
    {editor?.storage.characterCount.words() || 0} words
  </span>

  <span>
    {Math.ceil(
      (editor?.storage.characterCount.words() || 0) / 200
    )} min read
  </span>
</div>
    </div>
  );
};

export default RichEditor;
