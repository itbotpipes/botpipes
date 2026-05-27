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
import MainButton from "@/components/MainButton";

interface CareerFormProps {
  className?: string;
}

/* ---------------- SCHEMA ---------------- */

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  contact: yup.string().required("Contact is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  linkedin: yup.string().url("Invalid URL").required("LinkedIn is required"),
  resume: yup.array().of(yup.mixed()).max(1, "Only 1 file allowed"),
  comments: yup.string().notRequired(),
});

type FormValues = yup.InferType<typeof schema>;

const CareerForm: React.FC<CareerFormProps> = ({ className }) => {
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
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      linkedin: "",
      resume: [],
      comments: "",
    },
  });

  const handleDrop = (incoming: File[]) => {
    setFiles(incoming);
    setValue("resume", incoming, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    setSending(true);

    await emailjs.send(
      process.env.NEXT_PUBLIC_SERVICE_KEY!,
      process.env.NEXT_PUBLIC_TEMPLATE_KEY!,
      data,
      process.env.NEXT_PUBLIC_EMAILJS_KEY!
    );

    setSending(false);
    setIsOpen(false);
  };

  /* ---------------- EFFECTS ---------------- */

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

  /* ---------------- UI ---------------- */

  return (
    <div className={clsx("", className)}>
      {/* <Button
        className="cursor-pointer md:w-1/3 max-md:w-1/2 rounded-full bg-[#24275E] py-6 text-lg font-semibold text-white hover:bg-[#1b2d61]"
        onClick={() => setIsOpen(true)}
      >
        Apply Now
      </Button> */}
      <MainButton 
        text="Apply now"
        variant={"primary"}
        onClick={() => setIsOpen(true)}
      />

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
              >
                <motion.div
                  className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain space-y-10 rounded-2xl bg-white px-4 py-6"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>

                  <h1 className="font-urbanist text-3xl font-bold">
                    Application Form
                  </h1>

                  {/* RESUME UPLOAD */}
                  <div className="space-y-2 md:px-4">
                    <h2 className="text-xl font-semibold">UPLOAD RESUME</h2>
                    <Controller
                      name="resume"
                      control={control}
                      render={({ field }) => (
                        <Dropzone
                          accept={{ "application/pdf": [".pdf"] }}
                          maxFiles={1}
                          maxSize={1024 * 1024 * 10}
                          onDrop={(f: File[]) => {
                            field.onChange(f);
                            handleDrop(f);
                          }}
                          src={files}
                        >
                          <DropzoneEmptyState />
                          <DropzoneContent />
                        </Dropzone>
                      )}
                    />
                    {errors.resume && (
                      <p className="text-sm text-red-600">
                        {errors.resume.message as string}
                      </p>
                    )}
                  </div>

                  {/* PERSONAL INFO */}
                  <div className="space-y-4 md:px-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-medium">FIRST NAME</label>
                        <Input {...register("firstName")} className="mt-1" />
                        {errors.firstName && (
                          <p className="text-red-600 text-sm">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium">LAST NAME</label>
                        <Input {...register("lastName")} className="mt-1" />
                        {errors.lastName && (
                          <p className="text-red-600 text-sm">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium">CONTACT</label>
                        <Input {...register("contact")} className="mt-1" />
                        {errors.contact && (
                          <p className="text-red-600 text-sm">
                            {errors.contact.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium">EMAIL</label>
                        <Input {...register("email")} type="email" className="mt-1" />
                        {errors.email && (
                          <p className="text-red-600 text-sm">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">LINKEDIN URL</label>
                      <Input {...register("linkedin")} className="mt-1" />
                      {errors.linkedin && (
                        <p className="text-red-600 text-sm">
                          {errors.linkedin.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        ADDITIONAL COMMENTS
                      </label>
                      <Textarea
                        {...register("comments")}
                        className="mt-1 min-h-[100px]"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting || sending}
                    className="w-full rounded-full bg-[#27408A] py-6 text-lg font-semibold text-white hover:bg-[#1b2d61]"
                  >
                    Submit Application
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

export default CareerForm;
