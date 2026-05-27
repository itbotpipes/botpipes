import React from "react";
import clsx from "clsx";
import { AppDispatch } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import { createGallery } from "@/lib/redux/gallery/thunk";
import GalleryForm from "../Form/GalleryForm";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormDataType } from "../Form/useGalleryForm";

interface DialogProps {
  className?: string;
  closeDialog: () => void;
}

const CreateGalleryDialog: React.FC<DialogProps> = ({ closeDialog }) => {
  return (
    <DialogContent className="flex max-h-[80vh] flex-col">
      <DialogHeader className="flex-1">
        <DialogTitle>Upload Image</DialogTitle>
        <DialogDescription>
          Upload a new image for the gallery
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-auto">
        <DialogForm closeDialog={closeDialog} />
      </div>
    </DialogContent>
  );
};

export default CreateGalleryDialog;

interface DialogFormProps {
  className?: string;
  closeDialog: () => void;
}

const DialogForm: React.FC<DialogFormProps> = ({ closeDialog }) => {
  const dispatch = useDispatch<AppDispatch>();

  const submitHandler = (data: FormDataType) => {
    const { file } = data.image;
    if (!file || typeof file === "string") return;

    dispatch(createGallery({ ...data, image: file }));
    closeDialog();
  };

  return (
    <div className={clsx("")}>
      <GalleryForm submitHandler={submitHandler} />
    </div>
  );
};
