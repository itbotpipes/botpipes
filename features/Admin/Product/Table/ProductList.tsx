"use client";

import React from "react";
import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/DataTable";
import ActionsCell from "./ActionCell";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { ProductRecord } from "@/lib/firebase/firestore/products";

interface ProductListProps {
  className?: string;
}

const columns: ColumnDef<ProductRecord>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => {
      const features = row.original.features.join(", ");
      return <span>{features}</span>;
    },
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
        const d = new Date(row.original.updated_at);
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

const ProductList: React.FC<ProductListProps> = ({ className }) => {
  const { products } = useSelector((state: RootState) => state.product);
  return (
    <div className={clsx("max-w-[80rem]", className)}>
      <DataTable columns={columns} data={products} />;
    </div>
  );
};

export default ProductList;
