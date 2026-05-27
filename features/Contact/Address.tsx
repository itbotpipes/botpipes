import React from "react";
import Image from "@/components/Image";
import clsx from "clsx";
import ContactForm from "./ContactForm";
import { Mail, PhoneCall, MapPin, Headset } from "lucide-react";

const addressDetails = [
  {
    title: "Write to us",
    value: "info@botpipestech.com",
    img: <Mail className="text-white"/>
  },
  {
    title: "Call us",
    value: "+91 95125 66629",
    img: <PhoneCall className="text-white"/>
  },
  {
    title: "Visit us",
    value: "72, near ONGC, Bhatpore GIDC, Patel Nagar, Surat, Gujarat 395010",
    img: <MapPin className="text-white"/>
  },
];

interface AddressProps {
  className?: string;
}
const Address: React.FC<AddressProps> = ({ className }) => {
  return (
    <div className={clsx("mx-auto max-w-[60rem] px-4", className)}>
      <div className="mb-10 rounded-b-2xl">
        <h3 className="mx-auto mb-3 w-fit rounded-full bg-[#24275E] px-4 py-1 text-[10px] text-white uppercase">
          contact us
        </h3>
        <h1 className="font-inter mb-5 text-center text-3xl font-bold md:text-4xl">
          We are here to help you
        </h1>
        <p className="font-inter text-center font-[500]">
          Need help? Or if you have a question, please contact us and our team
          will get
          <br /> back to you shortly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div className="">
          <div className="mb-8">
            <h2 className="font-inter mb-1 font-bold md:text-2xl">
              Contact Information
            </h2>
            <p className="mb-5">Get in touch with us.</p>
            <div className="flex flex-col gap-5">
              {addressDetails.map((item, indx) => (
                <div className="flex items-center gap-4" key={indx}>
                  <div className="h-auto w-fit bg-[#24275E] p-3 rounded-[100%]">
                    {item.img}
                  </div>
                  <div>
                    <h2 className="font-bold">{item.title}</h2>
                    <p className="text-xs">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-gray-200 border font-inter rounded-2xl bg-white p-8">
            {/* <Image
              className="mb-4 aspect-square h-auto w-[3.5rem]"
              src={"/contact/contact-logo.png"}
              alt={"contact logo"}
            /> */}
            <Headset className="mb-4 aspect-square h-auto w-[3.5rem]"/>
            <h1 className="mb-1 text-2xl font-bold">Generate a ticket</h1>
            <p className="mb-7 text-sm">
              Need help or have a question about our application, service?
              Please submit a ticket
            </p>
            <button className="cursor-pointer rounded-full bg-[#24275E] px-7 py-2.5 text-sm text-white transition-colors duration-300 hover:bg-[#2e327d]">
              Generate a ticket now
            </button>
          </div>
        </div>

        <ContactForm className="font-inter rounded-xl bg-white p-12 border-gray-200 border" />
      </div>
    </div>
  );
};

export default Address;
