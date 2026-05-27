import React from "react";
import clsx from "clsx";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CareerRecord } from "@/lib/firebase/firestore/careers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { updateCareer } from "@/lib/redux/career/thunk";
import CareerForm from "../Form/CareerForm";
import { useDialogController } from "./ActionCell";

interface EditDialogProps {
  className?: string;
  item: CareerRecord;
}

const EditDialog: React.FC<EditDialogProps> = ({ item }) => {
  return (
    <DialogContent className="flex max-h-[80vh] flex-col">
      <DialogHeader className="flex-1">
        <DialogTitle>Update Career</DialogTitle>
        <DialogDescription>
          Update the career details for: {item.role}
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-auto">
        <EditForm item={item} />
      </div>
    </DialogContent>
  );
};

interface EditFormProps {
  className?: string;
  item: CareerRecord;
}
const EditForm: React.FC<EditFormProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updateDialog } = useDialogController();

  const submitHandler = (data: CareerRecord) => {
    dispatch(updateCareer({ id: data.id!, update: data }));
    updateDialog(false);
  };

  return (
    <div className={clsx("")}>
      <CareerForm submitHandler={submitHandler} defaultValues={item} />
    </div>
  );
};

export default EditDialog;
