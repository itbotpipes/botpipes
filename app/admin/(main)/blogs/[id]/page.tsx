"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { updateBlog, deleteBlog } from "@/lib/redux/blogs/thunk";
import { getBlogById, BlogRecord } from "@/lib/firebase/firestore/blogs";
import { firestore } from "@/lib/firebase/firestore/firestore";
import NotionBlogEditor from "@/features/Admin/Blog/Form/NotionBlogEditor";
import { FormDataType } from "@/features/Admin/Blog/Form/useBlogForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

function EditBlogPage({ params }: PageProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = React.use(params);
  
  const { blogs } = useSelector((state: RootState) => state.blog);
  const [blog, setBlog] = useState<BlogRecord | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch blog detail
  useEffect(() => {
    const found = blogs.find((item) => item.id === id);
    if (found) {
      setBlog(found);
      setLoading(false);
    } else {
      getBlogById(firestore, id)
        .then((data) => {
          if (data) setBlog(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id, blogs]);

  const submitHandler = (data: FormDataType) => {
    const { publicId, file } = data.cover_image_url;
    
    if (id) {
      const payload = {
        id,
        update: {
          ...data,
          cover_image_url: { 
            publicId: publicId || "", 
            file 
          },
        },
      };

      dispatch(updateBlog(payload)).then(() => {
        router.push("/admin/blogs");
      });
    }
  };

  const deleteHandler = () => {
    if (confirm(`Are you sure you want to delete "${blog?.title}"?`)) {
      dispatch(
        deleteBlog({
          id,
          publicId: blog?.cover_image_url.publicId || "",
        })
      ).then(() => {
        router.push("/admin/blogs");
      });
    }
  };

  if (loading) {
    return (
      <div className="absolute inset-0 z-50 bg-[#191919] flex items-center justify-center text-[#8c8c8c]">
        Loading blog editor...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="absolute inset-0 z-50 bg-[#191919] flex flex-col items-center justify-center gap-4 text-[#8c8c8c]">
        <span>Blog not found.</span>
        <button
          onClick={() => router.push("/admin/blogs")}
          className="bg-[#2eaadc] hover:bg-[#1a93c4] text-white px-4 py-1.5 text-xs font-semibold rounded cursor-pointer transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 bg-[#191919]">
      <NotionBlogEditor
        defaultValues={blog}
        submitHandler={submitHandler}
        onDelete={deleteHandler}
      />
    </div>
  );
}

export default EditBlogPage;
