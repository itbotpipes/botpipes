import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";

interface HoverGridProps {
  className?: string;
}

interface Service {
  id: number;
  title: string;
  desc: string;
  img: string;
}
const services: Service[] = [
  {
    id: 0,
    title: "Quality & Testing",
    desc: `Every assembly is hydro-tested up to 300 PSI, visually inspected, 
      and verified for dimensional accuracy.Each batch is supplied with pressure 
      test certificates, weld logs, and coating test reports for full traceability.`,
    img: "/services/1.png",
  },
  {
    id: 1,
    title: "Precision Manufacturing",
    desc: `Automated plasma cutting and ABB robotic welding 
      deliver repeatable, leak-free joints.Pipes are powder-coated, 
      color-coded, and packaged ready for installation.`,
    img: "/services/2.png",
  },
  {
    id: 2,
    title: "Design & Engineering",
    desc: `In-house engineers develop CAD/BIM layouts, 
      perform code compliance checks, and optimize routing 
      for faster execution and easier inspection approval.`,
    img: "/services/3.png",
  },
  {
    id: 3,
    title: "INSTALLATION SUPPORT",
    desc: `We provide on-site technical guidance, installer 
      training, and step-by-step documentation to ensure 
      error-free installation of every system.`,
    img: "/services/4.png",
  },
  {
    id: 4,
    title: "PROJECT PACKAGING",
    desc: `Assemblies are numbered, labeled, and packed 
      zone-wise for quick identification and staged 
      execution — reducing confusion and installation delays.`,
    img: "/services/5.png",
  },
  {
    id: 5,
    title: "ON-TIME DELIVERY",
    desc: `With in-house logistics and regional dispatch, 
      every consignment arrives ready to install. Our 
      just-in-time approach keeps projects running on schedule.`,
    img: "/services/6.jpg",
  },
];

const HoverGrid: React.FC<HoverGridProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {services.map((item, indx) => (
        <HoverItem
          key={indx}
          item={item}
          className={clsx((indx === 0 || indx === 5) && "md:col-span-2")}
        />
      ))}
    </div>
  );
};

interface HoverItemProps {
  item: Service;
  className?: string;
}
const HoverItem: React.FC<HoverItemProps> = ({ item, className }) => {
  return (
    <div className={clsx("", className)}>
      <div className="group relative cursor-pointer">
        <Image
          src={item.img}
          alt={item.title}
          className="h-[25rem] w-full object-cover"
        />
        <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-transparent transition-all duration-300 group-hover:bg-white/10">
          <h1 className="-translate-y-5 text-3xl font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            VIEW
          </h1>
        </div>
      </div>
      <div className="font-anek py-6">
        <h2 className="mb-1 text-lg font-semibold uppercase">{item.title}</h2>
        <p className="mb-4 text-sm">{item.desc}</p>
      </div>
    </div>
  );
};

export default HoverGrid;
