"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/DataTable";
import ActionsCell from "./ActionCell";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import clsx from "clsx";
import { BlogRecord } from "@/lib/firebase/firestore/blogs";

interface CareerListProps {
  className?: string;
}

const CareerList: React.FC<CareerListProps> = ({ className }) => {
  const { blogs } = useSelector((state: RootState) => state.blog);
  const { categories } = useSelector((state: RootState) => state.category);

  const columns: ColumnDef<BlogRecord>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "author",
      header: "Author",
    },

    // ✅ CATEGORY COLUMN
    {
      accessorKey: "category_ids",
      header: "Category",
      cell: ({ row }) => {
        const categoryIds = row.original.category_ids || [];

        const names = categoryIds.map((id) => {
          const found = categories.find((cat) => cat.id === id);
          return found?.name || "Unknown";
        });

        return <span>{names.join(", ")}</span>;
      },
    },

    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => {
        const d = new Date(row.original.created_at);
        return <span>{format(d, "MMM d, yyyy")}</span>;
      },
    },

    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => {
        const d = new Date(row.original.updated_at); // ✅ FIXED
        return <span>{format(d, "MMM d, yyyy")}</span>;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return <ActionsCell item={item} />;
      },
    },
  ];

  return (
    <div className={clsx("max-w-[80rem]", className)}>
      <DataTable columns={columns} data={blogs} />
    </div>
  );
};

export default CareerList;