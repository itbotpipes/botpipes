import React from "react";
import clsx from "clsx";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import CareerForm from "../Form/CategoryForm";
import { useDialogController } from "./ActionCell";
import { CategoryRecord } from "@/lib/firebase/firestore/categories";
import { updateCategory } from "@/lib/redux/category/thunk";

interface EditDialogProps {
  className?: string;
  item: CategoryRecord;
}

const EditDialog: React.FC<EditDialogProps> = ({ item }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Career</DialogTitle>
        <DialogDescription>
          Update the career details for: {item.name}
        </DialogDescription>
      </DialogHeader>

      <EditForm item={item} />
    </DialogContent>
  );
};

interface EditFormProps {
  className?: string;
  item: CategoryRecord;
}
const EditForm: React.FC<EditFormProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updateDialog } = useDialogController();

  const submitHandler = (data: CategoryRecord | Omit<CategoryRecord, "id">) => {
    if ("id" in data) dispatch(updateCategory({ id: data.id, update: data }));
    updateDialog(false);
  };

  return (
    <div className={clsx("")}>
      <CareerForm submitHandler={submitHandler} defaultValues={item} />
    </div>
  );
};

export default EditDialog;
