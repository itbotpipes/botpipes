"use client";

import React, { useState } from "react";
import clsx from "clsx";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Resolver,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import VendorHeader from "./VendorHeader";
import CompanyInformation from "./CompanyInformation";
import ContactInformation from "./ContactInformation";
import BusinessDetails from "./BusinessDetails";
import { FormValues, schema } from "./Schema";
import QualityCompliance from "./QualityCompliance";
import MaterialCertificates from "./MaterialCertificates";
import InHouseTesting from "./InHouseTesting";
import CommercialInfo from "./CommercialInfo/Form";
import ClientReferences from "./ClientReferences/ClientReferences";
import AdditionalInfo from "./AdditionalInfo";
import Declaration from "./Declaration";
import emailjs from "@emailjs/browser";
import { flatten } from "@/lib/utils";
interface FormProps {
  className?: string;
}

const Form: React.FC<FormProps> = ({ className }) => {
  const [sending, setSending] = useState(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema) as Resolver<FormValues>,
    mode: "onSubmit",
    defaultValues: {
      clientReferences: [
        {
          companyName: "",
          contactPerson: "",
          phoneEmail: "",
          productsSupplied: "",
        },
      ],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSending(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_KEY!,
        process.env.NEXT_PUBLIC_VENDOR_TEMPLATE_KEY!,
        flatten(data),
        process.env.NEXT_PUBLIC_EMAILJS_KEY!,
      );
      methods.reset();
      alert("Form submitted successfully!");
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={clsx(
          "space-y-6 rounded-lg bg-white p-6 shadow-sm",
          className,
        )}
      >
        <VendorHeader />

        {/* <div className="flex items-center justify-center gap-3">
          <InfoIcon size={15} />
          <p className="text-center text-sm">
            We are coming up with this soon!!!
          </p>
        </div> */}

        <CompanyInformation />
        <hr className="border-t border-gray-300" />

        <ContactInformation />
        <hr className="border-t border-gray-300" />

        <BusinessDetails />
        <hr className="border-t border-gray-300" />

        <QualityCompliance />
        <hr className="border-t border-gray-300" />

        <MaterialCertificates />
        <hr className="border-t border-gray-300" />

        <InHouseTesting />
        <hr className="border-t border-gray-300" />

        <CommercialInfo />
        <hr className="border-t border-gray-300" />

        <ClientReferences />
        <hr className="border-t border-gray-300" />

        <AdditionalInfo />
        <hr className="border-t border-gray-300" />
        {/* <DocumentsUpload /> */}
        {/* <AdditionalInformation /> */}
        <Declaration />

        <div className="pt-4">
          <button
            onClick={methods.handleSubmit(onSubmit)}
            type="submit"
            disabled={sending}
            className="w-full cursor-pointer rounded-full bg-[#3B3F7A] py-2 text-center text-white transition-colors duration-150 ease-in-out hover:bg-[#32366a] focus:outline-none disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
