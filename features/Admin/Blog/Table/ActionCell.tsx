import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteDialog from "@/features/Admin/DeleteDialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { BlogRecord } from "@/lib/firebase/firestore/blogs";
import { deleteBlog } from "@/lib/redux/blogs/thunk";
import { useRouter } from "next/navigation";

interface ActionCellProps {
  className?: string;
  item: BlogRecord;
}

const ActionsCell: React.FC<ActionCellProps> = ({ item }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() =>
                item.id && navigator.clipboard.writeText(item.id)
              }
            >
              Copy payment ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => router.push(`/admin/blogs/${item.id}`)}
            >
              Update
            </DropdownMenuItem>

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-500 hover:bg-red-950/20">
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteDialog
          onDelete={() =>
            dispatch(
              deleteBlog({
                id: item.id,
                publicId: item.cover_image_url.publicId,
              })
            )
          }
          name={item.title}
        />
      </AlertDialog>
    </div>
  );
};

export default ActionsCell;
