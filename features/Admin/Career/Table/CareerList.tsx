"use client";

import React from "react";
import { CareerRecord } from "@/lib/firebase/firestore/careers";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/DataTable";
import ActionsCell from "./ActionCell";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import clsx from "clsx";

interface CareerListProps {
  className?: string;
}

const columns: ColumnDef<CareerRecord>[] = [
  {
    accessorKey: "role",
    header: "Role",
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

const CareerList: React.FC<CareerListProps> = ({ className }) => {
  const { careers } = useSelector((state: RootState) => state.career);
  return (
    <div className={clsx("max-w-[80rem]", className)}>
      <DataTable columns={columns} data={careers} />
    </div>
  );
};

export default CareerList;
