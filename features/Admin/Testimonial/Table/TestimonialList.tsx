"use client";

import React from "react";
import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/DataTable";
import ActionsCell from "./ActionCell";
import { TestimonialRecord } from "@/lib/firebase/firestore/testimonials";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

interface CareerListProps {
  className?: string;
}

const columns: ColumnDef<TestimonialRecord>[] = [
  {
    accessorKey: "username",
    header: "User",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "ratings",
    header: "Ratings",
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
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      return <ActionsCell item={item} />;
    },
  },
];

const TestimonialList: React.FC<CareerListProps> = ({ className }) => {
  const { testimonials } = useSelector((state: RootState) => state.testimonial);
  return (
    <div className={clsx("max-w-[80rem]", className)}>
      <DataTable columns={columns} data={testimonials} />
    </div>
  );
};

export default TestimonialList;
