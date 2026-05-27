"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface ContactFormProps {
  className?: string;
}

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  country: yup.string().required("Country is required"),
  number: yup.string().required("Number is required"),
  message: yup.string().required("Message is required"),
});

type FormValues = yup.InferType<typeof schema>;

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // TODO: Handle form submission (e.g., send data to an API)
    setSending(true);

    await fetch(
      "https://script.google.com/macros/s/AKfycbytA0RXkTf59smY4mfYHChjFZ8zEzZ0iqGZO_MpvSMQm-p91T7eHIPHkEDZqF9EvcjIUw/exec",
      {
        mode: "no-cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    reset();
    setSending(false);
  };

  const { errors } = formState;

  return (
    <div className={clsx("", className)}>
      <h1 className="mb-2 text-center text-xl font-bold">Send us a message</h1>
      <p className="text-center text-sm">
        Fill out the form below, and our team will get back to you soon.
      </p>

      <form
        className="mt-5 flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Input
            className="w-full"
            variant="form"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            className="w-full"
            variant="form"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            className="w-full"
            variant="form"
            placeholder="Country"
            {...register("country")}
          />
          {errors.country && (
            <p className="text-sm text-red-600">{errors.country.message}</p>
          )}
        </div>

        <div>
          <Input
            className="w-full"
            variant="form"
            placeholder="Number"
            {...register("number")}
          />
          {errors.number && (
            <p className="text-sm text-red-600">{errors.number.message}</p>
          )}
        </div>

        <div>
          <Textarea
            placeholder="Message"
            className="mb-3 min-h-[6.5rem] resize-none rounded-md bg-[#EEEEEE] p-3 text-sm"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="cursor-pointer rounded-full bg-[#24275E] px-7 py-2.5 text-sm text-white transition-colors duration-300 hover:bg-[#2e327d] disabled:cursor-not-allowed disabled:bg-[#6b70c7] disabled:hover:bg-[#6b70c7]"
        >
          Generate a ticket now
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
