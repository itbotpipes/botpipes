import LatestBlogs from "./LatestBlogs";
import { getBlogs } from "@/lib/firebase/firestore/blogs";
import { getCategories } from "@/lib/firebase/firestore/categories";
import Blogs from "./Blogs";
import React from 'react';
// import CaseStudies from "../Solutions/CaseStudies";

export const revalidate = 60;

async function Latest() {
    const categories = await getCategories();
    const blogs = await getBlogs().then((blogs) =>
        blogs.map((blog) => ({
          ...blog,
          category_ids: blog.category_ids.map(
            (cat) => categories.find((c) => c.id === cat)?.name || cat,
          ),
        })),
      );
    
    return (
        <>
            {/* <CaseStudies /> */}
            {/* <LatestBlogs blogs={blogs} /> */}
            <Blogs blogs={blogs}/>
        </>
    );
}

export default Latest;