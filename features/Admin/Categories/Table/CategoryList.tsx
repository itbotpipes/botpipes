"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/DataTable";
import ActionsCell from "./ActionCell";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import clsx from "clsx";
import { CategoryRecord } from "@/lib/firebase/firestore/categories";

interface CareerListProps {
  className?: string;
}

const columns: ColumnDef<CategoryRecord>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) =>
      (() => {
        const d = new Date(row.original.created_at);
        const parsed = format(d, "MMM d, yyyy");
        return <span>{parsed}</span>;
      })(),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) =>
      (() => {
        const d = new Date(row.original.created_at);
        const parsed = format(d, "MMM d, yyyy");
        return <span>{parsed}</span>;
      })(),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return <ActionsCell item={item} />;
    },
  },
];

const CategoryList: React.FC<CareerListProps> = ({ className }) => {
  const { categories } = useSelector((state: RootState) => state.category);
  return (
    <div className={clsx("max-w-[80rem]", className)}>
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoryList;
