"use client";

import React from "react";
import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/DataTable";
import ActionsCell from "./ActionCell";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { FaqRecord } from "@/lib/firebase/firestore/faq";

interface FaqListProps {
  className?: string;
}

const columns: ColumnDef<FaqRecord>[] = [
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "homepage",
    header: "In Homepage",
  },
  {
    accessorKey: "career",
    header: "In Career",
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

const FAQList: React.FC<FaqListProps> = ({ className }) => {
  const { faqs } = useSelector((state: RootState) => state.faq);
  return (
    <div className={clsx("max-w-[80rem]", className)}>
      <DataTable columns={columns} data={faqs} />
    </div>
  );
};

export default FAQList;
