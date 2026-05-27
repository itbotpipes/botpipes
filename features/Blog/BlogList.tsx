import React from "react";
import Image from "@/components/Image";
import { ArrowRight } from "lucide-react";
import { BlogRecord } from "@/lib/firebase/firestore/blogs";
import Link from "next/link";

interface BlogInterface extends Omit<BlogRecord, "category_ids"> {
  category_ids: string[];
}

interface BlogListProps {
  blogs: BlogInterface[];
}


const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
console.log(blogs);

  // ✅ filter only blogs category
  const filteredBlogs = blogs.filter((blog) =>
    blog.category_ids?.includes("Blogs") // ⚠️ change this ID if needed
  );

  return (
    <div className="mx-auto max-w-[65rem] px-4 py-20">
      <h1 className="font-inter mb-20 text-center text-4xl font-semibold md:text-7xl">
        News & Insights
      </h1>

      <div className="flex flex-col gap-20">
        {filteredBlogs.map((item, indx) => (
          <div
            className="bg-white flex flex-col-reverse overflow-hidden shadow-md md:flex-row md:rounded-xl"
            key={indx}
          >
            <div className="flex-1">
              <div className="font-inter flex-1 p-6 md:p-10">
                <h1 className="mb-5 text-2xl font-semibold">{item.title}</h1>

                <Link
                  href={`/blog/${item.slug}`}
                  className="cursor-pointer font-semibold"
                >
                  Read Blog{" "}
                  <ArrowRight
                    className="inline text-green-600"
                    strokeWidth={1}
                    size={20}
                  />
                </Link>
              </div>
            </div>

            <div className="aspect-video max-h-[18rem] w-full flex-1 overflow-hidden px-6 md:max-h-[25rem] md:px-0">
              <Image
                className="h-full w-full rounded-lg object-cover md:rounded-none"
                src={item.cover_image_url.secureUrl}
                alt={item.title}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
