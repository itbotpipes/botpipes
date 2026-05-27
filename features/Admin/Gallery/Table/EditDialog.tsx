import React from "react";
import clsx from "clsx";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GalleryForm from "../Form/GalleryForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { useDialogController } from "./ActionCell";
import { GalleryRecord } from "@/lib/firebase/firestore/gallery";
import { updateGallery } from "@/lib/redux/gallery/thunk";
import { FormDataType } from "../Form/useGalleryForm";

interface EditDialogProps {
  className?: string;
  item: GalleryRecord;
}

const EditDialog: React.FC<EditDialogProps> = ({ item }) => {
  return (
    <DialogContent className="flex max-h-[80vh] flex-col">
      <DialogHeader className="flex-1">
        <DialogTitle>Update Gallery</DialogTitle>
        <DialogDescription>
          Update the Gallery details for: {item.name}
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
  item: GalleryRecord;
}

const EditForm: React.FC<EditFormProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updateDialog } = useDialogController();

  const submitHandler = (data: FormDataType) => {
    const { publicId, file } = data.image;
    updateDialog(false);

    if (data.id && publicId) {
      const payload = {
        id: data.id,
        update: {
          ...data,
          image: { publicId, file },
        },
      };

      dispatch(updateGallery(payload));
    }
  };

  return (
    <div className={clsx("")}>
      <GalleryForm initialData={item} submitHandler={submitHandler} />
    </div>
  );
};

export default EditDialog;
