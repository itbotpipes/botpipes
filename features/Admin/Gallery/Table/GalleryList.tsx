"use client";

import React from "react";
import clsx from "clsx";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/DataTable";
import ActionsCell from "./ActionCell";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { GalleryRecord } from "@/lib/firebase/firestore/gallery";
import Image from "@/components/Image";

interface GalleryListProps {
  className?: string;
}

const columns: ColumnDef<GalleryRecord>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-4">
        <Image
          src={row.original.image.secureUrl}
          alt={row.original.image.publicId}
          title={row.original.name}
          className="aspect-square h-auto w-[3rem] rounded-md object-cover"
        />
        <span>{row.original.name}</span>
      </div>
    ),
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

const GalleryList: React.FC<GalleryListProps> = ({ className }) => {
  const { galleries } = useSelector((state: RootState) => state.gallery);
  return (
    <div className={clsx("max-w-[80rem]", className)}>
      <DataTable columns={columns} data={galleries} />
    </div>
  );
};

export default GalleryList;
