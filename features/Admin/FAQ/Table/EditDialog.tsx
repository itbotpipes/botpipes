import React from "react";
import clsx from "clsx";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaqRecord } from "@/lib/firebase/firestore/faq";
import FaqForm from "../Form/FaqForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { updateFaq } from "@/lib/redux/faq/thunk";
import { useDialogController } from "./ActionCell";

interface EditDialogProps {
  className?: string;
  item: FaqRecord;
}

const EditDialog: React.FC<EditDialogProps> = ({ item }) => {
  return (
    <DialogContent className="flex max-h-[80vh] flex-col">
      <DialogHeader className="flex-1">
        <DialogTitle>Update FAQ</DialogTitle>
        <DialogDescription>
          Update the FAQ details for: {item.question}
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
  item: FaqRecord;
}

const EditForm: React.FC<EditFormProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updateDialog } = useDialogController();
  const submitHandler = (data: FaqRecord) => {
    dispatch(updateFaq({ id: data.id!, update: data }));
    updateDialog(false);
  };

  return (
    <div className={clsx("")}>
      <FaqForm initialData={item} submitHandler={submitHandler} />
    </div>
  );
};

export default EditDialog;
