import Hero from "@/components/Hero";
import BlogList from "@/features/Blog/BlogList";
import { getBlogs } from "@/lib/firebase/firestore/blogs";
import { getCategories } from "@/lib/firebase/firestore/categories";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "edge";
async function Blog() {
  const categories = await getCategories();

  const rawBlogs = await getBlogs();

  const blogs = rawBlogs.map((blog) => ({
    ...blog,
    category_ids: blog.category_ids.map(
      (cat) => categories.find((c) => c.id === cat)?.name || cat,
    ),
  }));

  return (
    <div>
      <Hero
        src="/imgs/pipe.png"
        text="Knowledge Hub"
        custom="md:text-7xl text-4xl"
      />

      <BlogList blogs={blogs} />
    </div>
  );
}

export default Blog;