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
import ProductForm from "../Form/ProductForm";
import { ProductRecord } from "@/lib/firebase/firestore/products";
import { updateProduct } from "@/lib/redux/product/thunk";

interface EditDialogProps {
  className?: string;
  item: ProductRecord;
  name: string;
}

const EditDialog: React.FC<EditDialogProps> = ({ item, name }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update Product</DialogTitle>
        <DialogDescription>
          Update the product details for: {name}
        </DialogDescription>
      </DialogHeader>

      <EditForm item={item} />
    </DialogContent>
  );
};

interface EditFormProps {
  className?: string;
  item: ProductRecord;
}

const EditForm: React.FC<EditFormProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { updateDialog } = useDialogController();

  const submitHandler = (data: ProductRecord) => {
    dispatch(updateProduct({ id: data.id!, update: data }));
    updateDialog(false);
  };

  return (
    <div className={clsx("")}>
      <ProductForm initialData={item} submitHandler={submitHandler} />
    </div>
  );
};

export default EditDialog;
