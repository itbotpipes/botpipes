import { Button } from "@/components/ui/button";
import CategoryList from "@/features/Admin/Categories/Table/CategoryList";
import Link from "next/link";
import React from "react";

function Category() {
  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold">Category</h1>

      <div className="space-y-10">
        <div>
          <Button className="cursor-pointer" asChild>
            <Link href={"/admin/categories/add"}>Add Category</Link>
          </Button>
        </div>

        <CategoryList />
      </div>
    </div>
  );
}

export default Category;
