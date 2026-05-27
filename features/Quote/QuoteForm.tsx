"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
import * as yup from "yup";
import { useSmoothContext } from "@/components/SmoothWrapper";
import { createPortal } from "react-dom";


interface QuoteFormProps {
  className?: string;
}

const schema = yup.object({
  projectName: yup.string().required("Project name is required"),
  clientName: yup.string().required("Client name is required"),
  location: yup.string().required("Location is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  pipeSize: yup.string().required("Pipe size is required"),
  deliveryDate: yup.date().nullable().typeError("Invalid date"),
  contactName: yup.string().required("Contact name is required"),
  company: yup.string().required("Company is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  designProjectName: yup.string().required("Project name is required"),
  files: yup.array().of(yup.mixed()).max(10, "Max 10 files"),
  notes: yup.string().notRequired(),
});

type FormValues = yup.InferType<typeof schema>;

const QuoteForm: React.FC<QuoteFormProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sending, setSending] = useState(false);
  const [files, setFiles] = useState<File[] | undefined>();
  const { smooth } = useSmoothContext();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    defaultValues: {
      projectName: "",
      clientName: "",
      location: "",
      lastName: "",
      address: "",
      pipeSize: "",
      deliveryDate: new Date(),
      contactName: "",
      company: "",
      email: "",
      phone: "",
      designProjectName: "",
      files: [],
      notes: "",
    },
  });

  const handleDrop = (incoming: File[]) => {
    setFiles(incoming);
    setValue("files", incoming, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    setSending(true);
    // TODO: replace with real submit logic (API call)

    await emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_KEY!,
      process.env.NEXT_PUBLIC_TEMPLATE_KEY!,
      data,
      process.env.NEXT_PUBLIC_EMAILJS_KEY!,
    );

    setSending(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!smooth) return;

    if (isOpen) {
      smooth.paused(true);   // stops page scrolling
    } else {
      smooth.paused(false);  // resumes scrolling
    }

    return () => {
      smooth.paused(false);
    };
  }, [isOpen, smooth]);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [isOpen]);



  return (
    <div className={clsx("md:py-10 pb-10 w-full flex justify-center", className)}>
        <Button
          className="cursor-pointer md:w-1/3 max-md:w-1/2 rounded-full bg-[#27408A] py-6 text-lg font-semibold text-white hover:bg-[#1b2d61]"
          onClick={() => setIsOpen(true)}
        >
          Get My Quote
        </Button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                onWheel={(e) => e.preventDefault()}
                onTouchMove={(e) => e.preventDefault()}
              >
                <motion.div
                  className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain space-y-10 rounded-2xl bg-white px-4 py-6"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                    <h1 className="font-urbanist text-3xl font-bold">
                      Get Your Quote in 3 Simple Steps
                    </h1>

                    {/* Upload Files Section */}
                    <div className="font-arabic space-y-2 md:px-4">
                      <h2 className="text-xl font-semibold">UPLOAD YOUR FILES</h2>
                      <p className="text-sm text-gray-600">
                        ACCEPTABLE FORMATS: .DWG, .PDF, .XLS, .ZIP (UP TO 25MB).
                      </p>
                      <Controller
                        name="files"
                        control={control}
                        render={({ field }) => (
                          <Dropzone
                            accept={{
                              "application/pdf": [".pdf"],
                              "application/zip": [".zip"],
                              "application/vnd.ms-excel": [".xls"],
                              "application/acad": [".dwg"],
                              "image/vnd.dwg": [".dwg"],
                            }}
                            maxFiles={10}
                            maxSize={1024 * 1024 * 25}
                            minSize={1024}
                            onDrop={(f: File[]) => {
                              field.onChange(f);
                              handleDrop(f);
                            }}
                            onError={console.error}
                            src={files}
                          >
                            <DropzoneEmptyState />
                            <DropzoneContent />
                          </Dropzone>
                        )}
                      />
                      {errors.files && (
                        <p className="text-sm text-red-600">
                          {errors.files?.message as string}
                        </p>
                      )}
                    </div>

                    {/* Project Details Section */}
                    <div className="font-arabic space-y-4 md:px-4">
                      <h2 className="text-xl font-semibold">ADD PROJECT DETAILS</h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">PROJECT NAME</label>
                          <Input
                            {...register("projectName")}
                            placeholder="Name"
                            className="mt-1"
                          />
                          {errors.projectName && (
                            <p className="text-sm text-red-600">
                              {errors.projectName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">CLIENT NAME</label>
                          <Input
                            {...register("clientName")}
                            placeholder="Client Name"
                            className="mt-1"
                          />
                          {errors.clientName && (
                            <p className="text-sm text-red-600">
                              {errors.clientName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">LOCATION</label>
                          <Input
                            {...register("location")}
                            placeholder="Location"
                            className="mt-1"
                          />
                          {errors.location && (
                            <p className="text-sm text-red-600">
                              {errors.location.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">LAST NAME</label>
                          <Input
                            {...register("lastName")}
                            placeholder="Last Name"
                            className="mt-1"
                          />
                          {errors.lastName && (
                            <p className="text-sm text-red-600">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">SITE ADDRESS</label>
                        <Input
                          {...register("address")}
                          placeholder="Address"
                          className="mt-1"
                        />
                        {errors.address && (
                          <p className="text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">REQUIRED PIPE SIZE</label>
                          <Input
                            {...register("pipeSize")}
                            placeholder="Size"
                            className="mt-1"
                          />
                          {errors.pipeSize && (
                            <p className="text-sm text-red-600">
                              {errors.pipeSize.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            EXPECTED DELIVERY DATE
                          </label>
                          <Input
                            {...register("deliveryDate")}
                            type="date"
                            className="mt-1"
                          />
                          {errors.deliveryDate && (
                            <p className="text-sm text-red-600">
                              {errors.deliveryDate.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Section */}
                    <div className="font-arabic space-y-2 md:px-4">
                      <h2 className="text-xl font-semibold">SUBMIT & GET A CALL BACK</h2>
                      <p className="text-sm text-gray-600">
                        OUR ESTIMATION TEAM WILL CONTACT YOU WITHIN{" "}
                        <strong>24 BUSINESS</strong> HOURS TO DISCUSS YOUR PROJECT AND SHARE
                        A TAILORED QUOTE.
                      </p>
                    </div>

                    {/* Upload Design Section */}
                    <div className="font-arabic space-y-4 md:px-4">
                      <h2 className="text-xl font-semibold">UPLOAD YOUR DESIGN</h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">NAME</label>
                          <Input
                            {...register("contactName")}
                            placeholder="Name"
                            className="mt-1"
                          />
                          {errors.contactName && (
                            <p className="text-sm text-red-600">
                              {errors.contactName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">COMPANY</label>
                          <Input
                            {...register("company")}
                            placeholder="Company"
                            className="mt-1"
                          />
                          {errors.company && (
                            <p className="text-sm text-red-600">{errors.company.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">EMAIL</label>
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="Email"
                            className="mt-1"
                          />
                          {errors.email && (
                            <p className="text-sm text-red-600">{errors.email.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">PHONE</label>
                          <Input
                            {...register("phone")}
                            type="tel"
                            placeholder="Phone"
                            className="mt-1"
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-600">{errors.phone.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">PROJECT NAME</label>
                          <Input
                            {...register("designProjectName")}
                            placeholder="Project Name"
                            className="mt-1"
                          />
                          {errors.designProjectName && (
                            <p className="text-sm text-red-600">
                              {errors.designProjectName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium">UPLOAD FILES</label>
                          <Input type="file" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">ADDITIONAL NOTES</label>
                        <Textarea
                          {...register("notes")}
                          placeholder="Add any additional details or requirements..."
                          className="mt-1 min-h-[100px]"
                        />
                        {errors.notes && (
                          <p className="text-sm text-red-600">{errors.notes.message}</p>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmit(onSubmit)}
                      disabled={isSubmitting || sending}
                      className="w-full rounded-full bg-[#27408A] py-6 text-lg font-semibold text-white hover:bg-[#1b2d61] disabled:cursor-not-allowed"
                    >
                      Get My Quote
                    </Button>
                  </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default QuoteForm;
