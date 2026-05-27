import React, { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogForm from "./DialogForm";
import { Button } from "@/components/ui/button";

interface DialogProps {
  className?: string;
}

const CreateGalleryDialog: React.FC<DialogProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        <Button>Add Images</Button>
      </DialogTrigger>

      <DialogForm closeDialog={() => setOpen(false)} />
    </Dialog>
  );
};

export default CreateGalleryDialog;
