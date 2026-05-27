import { tiptapJsonToHtml } from "@/lib/editor";
import { JSONContent } from "@tiptap/react";
import { useMemo } from "react";

export default function useJsonToHtml(content: JSONContent) {
  const html = useMemo(() => {
    if (!content) return "";
    try {
      return tiptapJsonToHtml(content);
    } catch (e) {
      console.error("Failed to convert tiptap json to html", e);
      return "";
    }
  }, [content]);

  const safeHtml = html;

  return safeHtml;
}
