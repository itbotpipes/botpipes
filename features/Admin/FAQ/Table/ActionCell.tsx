import React, { createContext, useContext, useState } from "react";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "@/features/Admin/DeleteDialog";
import { FaqRecord } from "@/lib/firebase/firestore/faq";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { deleteFaq } from "@/lib/redux/faq/thunk";

interface ActionCellProps {
  className?: string;
  item: FaqRecord;
}

interface DialogStateController {
  updateDialog: (state: boolean) => void;
  deleteDialog: (state: boolean) => void;
}

const DialogStateController = createContext<DialogStateController>({
  updateDialog: () => {},
  deleteDialog: () => {},
});

export const useDialogController = () => useContext(DialogStateController);

const ActionsCell: React.FC<ActionCellProps> = ({ item }) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DialogStateController.Provider
      value={{ updateDialog: setIsUpdateOpen, deleteDialog: setIsDeleteOpen }}
    >
      <div className="flex justify-end">
        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                <DropdownMenuItem
                  onClick={() =>
                    item.id && navigator.clipboard.writeText(item.id)
                  }
                >
                  Copy payment ID
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DialogTrigger asChild>
                  <DropdownMenuItem>Update</DropdownMenuItem>
                </DialogTrigger>

                <AlertDialogTrigger asChild>
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            <EditDialog item={item} />
          </Dialog>

          <DeleteDialog
            onDelete={() => dispatch(deleteFaq(item.id!))}
            name={item.question}
          />
        </AlertDialog>
      </div>
    </DialogStateController.Provider>
  );
};

export default ActionsCell;
