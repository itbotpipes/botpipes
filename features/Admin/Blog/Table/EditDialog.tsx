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
import BlogForm from "../Form/BlogForm";
import { useDialogController } from "./ActionCell";
import { BlogRecord } from "@/lib/firebase/firestore/blogs";
import { updateBlog } from "@/lib/redux/blogs/thunk";
import { FormDataType } from "../Form/useBlogForm";

interface EditDialogProps {
  className?: string;
  item: BlogRecord;
}

const EditDialog: React.FC<EditDialogProps> = ({ item }) => {
  return (
    <DialogContent className="flex max-h-[80vh] flex-col">
      <DialogHeader className="flex-1">
        <DialogTitle>Update Career</DialogTitle>
        <DialogDescription>
          Update the career details for: {item.title}
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
  item: BlogRecord;
}
const EditForm: React.FC<EditFormProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updateDialog } = useDialogController();

  const submitHandler = (data: FormDataType) => {
    const { publicId, file } = data.cover_image_url;
    updateDialog(false);

    if (data.id && publicId) {
      const payload = {
        id: data.id,
        update: {
          ...data,
          cover_image_url: { publicId, file },
        },
      };

      dispatch(updateBlog(payload));
    }
  };

  return (
    <div className={clsx("")}>
      <BlogForm submitHandler={submitHandler} defaultValues={item} />
    </div>
  );
};

export default EditDialog;
