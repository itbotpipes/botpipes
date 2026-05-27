import React from "react";
import clsx from "clsx";
import { BlogRecord } from "@/lib/firebase/firestore/blogs";
import Image from "@/components/Image";
import { JSONContent } from "@tiptap/react";
import RichTextRenderer from "@/components/RichTextRenderer";

interface BlogDetailsProps {
  className?: string;
  blog: BlogRecord;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ className, blog }) => {
  return (
    <div className={clsx("min-h-screen pt-40 pb-20", className)}>
      <div className="mx-auto max-w-[65rem] space-y-30">
        <h1 className="font-inter text-6xl font-semibold">{blog.title}</h1>

        <Image
          src={blog.cover_image_url.secureUrl}
          alt={blog.title}
          className="h-[25rem] w-full rounded-lg object-cover"
        />

        <BlogContent content={JSON.parse(blog.content) as JSONContent} />
      </div>
    </div>
  );
};

interface BlogContent {
  content: JSONContent;
}
const BlogContent: React.FC<BlogContent> = ({ content }) => {
  return (
    <div>
      <RichTextRenderer className="space-y-2 [&>p]:min-h-3" content={content} />
    </div>
  );
};

export default BlogDetails;
