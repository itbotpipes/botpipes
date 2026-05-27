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
import { useDialogController } from "./ActionCell";
import {
  InitialTestimonialRecord,
  TestimonialRecord,
} from "@/lib/firebase/firestore/testimonials";
import TestimonialForm from "../Form/TestimonialForm";
import { updateTestimonial } from "@/lib/redux/testimonial/thunk";

interface EditDialogProps {
  className?: string;
  item: TestimonialRecord;
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
  item: TestimonialRecord;
}
const EditForm: React.FC<EditFormProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updateDialog } = useDialogController();

  const submitHandler = (data: InitialTestimonialRecord) => {
    if (data.id) dispatch(updateTestimonial({ id: data.id, update: data }));
    updateDialog(false);
  };

  return (
    <div className={clsx("")}>
      <TestimonialForm submitHandler={submitHandler} initialData={item} />
    </div>
  );
};

export default EditDialog;
