import BlogDetails from "@/features/Blog/BlogDetails";
import { getBlogBySlug } from "@/lib/firebase/firestore/blogs";
import { notFound } from "next/navigation";

export const runtime = 'edge';

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  const { slug } = await params; // ✅ REQUIRED in Next 15

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetails blog={blog} />;
}
