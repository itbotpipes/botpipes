import { Editor, JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { generateHTML } from "@tiptap/html";

export function tiptapJsonToHtml(doc: JSONContent): string {
  const html = generateHTML(doc, [StarterKit]);
  return html;
}

export function tiptapJsonToText(doc: JSONContent): string {
  const editor = new Editor({
    editable: false,
    content: doc,
    extensions: [StarterKit],
  });
  const text = editor.getText();
  editor.destroy();
  return text;
}

export function tiptapJsonToMarkdown(doc: JSONContent): string {
  const editor = new Editor({
    editable: false,
    content: doc,
    extensions: [StarterKit],
  });
  const md = defaultMarkdownSerializer.serialize(editor.state.doc);
  editor.destroy();
  return md;
}
