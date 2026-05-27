import React from "react";
import clsx from "clsx";
import { JSONContent } from "@tiptap/react";
import useJsonToHtml from "./hooks/useJsonToHtml";

interface RichTextRendererProps {
  className?: string;
  content: JSONContent;
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  className,
  content,
}) => {
  const safeHtml = useJsonToHtml(content);

  return (
    <div
      className={clsx("rich-editor", className)}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
};

export default RichTextRenderer;
