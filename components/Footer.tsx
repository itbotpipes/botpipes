import React from "react";
import Image from "./Image";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
} from "react-icons/pi";
import Link from "next/link";
import { RiMailFill, RiPhoneFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { links } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="w-screen bg-[#24275E] pb-10 text-white">
      <div className="mx-auto max-w-[75rem] px-4 pb-10 pt-5">
        {/* <div className="mb-15 flex md:flex-row max-md:flex-col">
          <div className="mb-8 md:mb-0 flex-1">
            <h1 className="font-anek text-4xl">Subscribe our newsletters</h1>
            <p className="font-anek">
              <strong>
                Join our growing community of 5000+ fire-safety professionals.
              </strong>
              <br />
              Get updates on new technologies, prefab innovations, and
              engineering insights &mdash; straight from India&apos;s most
              advanced <strong>fire-safety manufacturing ecosystem.</strong>
            </p>
          </div>
          <form className="flex-1">
            <div className="flex max-w-full rounded-full bg-white p-1">
              <input
                className="min-w-0 flex-1 pl-4 text-sm text-black outline-none"
                placeholder="Enter your Email"
                type="text"
              />
              <button className="rounded-full bg-black px-8 py-2 text-center text-sm">
                Subscribe
              </button>
            </div>
          </form>
        </div> */}
        <div className="flex flex-col gap-8 border-y-1 border-white/10 py-8 md:flex-row justify-between">
          <div className="w-[20rem] flex flex-col gap-5">
            <Image
              className="mb-4 h-fit w-[11rem] object-contain"
              src="/nav-logo.png"
              alt="logo"
            />
            <p className="font-arabic mb-4 text-sm">
              {/* We build{" "}
              <strong>
                robotics-driven, prefabricated, ready-to-install fire-safety systems
              </strong>
              engineered for unmatched{" "}
              <strong>speed, precision, and reliability—</strong>
              making fire protection{" "}
              <strong>faster, smarter, and safer</strong>
              through advanced automation. */}
              We build robotics-driven, prefabricated fire-safety systems designed for fast, 
              precise, and reliable installation—making fire protection smarter and safer through 
              automation.
            </p>
            <div className="flex gap-2">
              <a href="https://www.linkedin.com/company/botpipes-tech-pvt-ltd/" 
                className="flex cursor-pointer items-center justify-center rounded-full border-1 border-white/20 p-1.5"
                target="_blank"
              >
                <PiLinkedinLogo size={25} strokeWidth={3} />
              </a>
              <button className="flex cursor-pointer items-center justify-center rounded-full border-1 border-white/20 p-1.5">
                <PiFacebookLogo size={25} strokeWidth={3} />
              </button>
              <a href="https://www.instagram.com/botpipestech/" 
                className="flex cursor-pointer items-center justify-center rounded-full border-1 border-white/20 p-1.5"
                target="_blank"
              >
                <PiInstagramLogo size={25} strokeWidth={3} />
              </a>
            </div>
          </div>

          <div className="font-anek w-[8rem]">
            <h2 className="mb-2 font-semibold">Quick Links</h2>
            <div className="space-y-1">
              {links.map((link, indx) => (
                <Link className="block" key={indx} href={link.path}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Image
              src="/certs.png"
              alt="certs"
              className="h-full w-fit object-contain"
            />
          </div>

          <div className="h-fit max-w-[18rem] rounded-xl bg-white/10 p-4">
            <h2 className="font-anek mb-3 font-semibold">Contact Us</h2>
            <div className="space-y-2">
              <div className="flex gap-2">
                <RiPhoneFill size={20} className="min-w-5" />
                <p>+91 95125 66629</p>
              </div>
              <div className="flex gap-2">
                <RiMailFill size={20} className="min-w-5" />
                <p>info@botpipestech.com</p>
              </div>
              <div className="flex gap-2">
                <HiLocationMarker size={20} className="min-w-5" />
                <p>
                  72, near ONGC, Bhatpore GIDC, Patel Nagar, Surat, Gujarat
                  395010
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-anek text-center text-sm">
        Copyright © 2025 All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
