import React from "react";
import clsx from "clsx";

interface ListProps {
  className?: string;
}

interface IItem {
  title: string;
  desc: React.ReactNode;
}

const items: IItem[] = [
  {
    title: "Pipes and Fittings",
    desc: (
      <>
        Our range of <strong>robust piping and fitting solutions</strong>{" "}
        ensures exceptional{" "}
        <strong>
          durability, dimensional accuracy, and leak-proof performance
        </strong>{" "}
        across all types of installations. From{" "}
        <strong>commercial complexes to industrial infrastructure</strong>, each
        component is built to withstand demanding environments and exceed client
        expectations.
      </>
    ),
  },
  {
    title: "Valves and Controls",
    desc: (
      <>
        Experience <strong>seamless flow management</strong> with our
        precision-engineered valves and control systems. Designed for{" "}
        <strong>maximum efficiency and reliability</strong>, they deliver
        consistent performance in both{" "}
        <strong>fire protection and mechanical applications</strong>.
      </>
    ),
  },
  {
    title: "Flanges and Couplings",
    desc: (
      <>
        Our <strong>flanges and couplings</strong> provide{" "}
        <strong>secure, corrosion-resistant connections</strong> that enhance
        the longevity and performance of your system. Built with{" "}
        <strong>superior-grade materials</strong>, they guarantee{" "}
        <strong>tight seals and easy maintenance</strong> for any industrial
        setup.
      </>
    ),
  },
  {
    title: "Accessories and Components",
    desc: (
      <>
        From <strong>support brackets</strong> to{" "}
        <strong>customized fabrication parts</strong>, our accessories are
        designed to complement and enhance your project&apos;s performance —
        ensuring every installation remains{" "}
        <strong>safe, efficient, and future-ready</strong>.
      </>
    ),
  },
];

const List: React.FC<ListProps> = ({ className }) => {
  return (
    <div className={clsx("grid grid-cols-1 gap-4", className)}>
      <h1 className="font-inter mb-2 text-4xl font-bold md:text-6xl lg:col-span-3">
        Our Product Range
      </h1>
      <div className="flex flex-col items-center gap-5">
        <div className="grid grid-cols-1 gap-8 gap-x-40 md:grid-cols-2 lg:col-span-2 lg:col-start-2">
          {items.map((item, indx) => (
            <ListItem {...item} key={indx} />
          ))}
        </div>
        <button className="h-fit w-fit rounded-full border-1 border-black px-10 py-2 lg:col-start-1 lg:row-start-2">
          See More
        </button>
      </div>
    </div>
  );
};

const ListItem: React.FC<IItem> = ({ title, desc }) => {
  return (
    <div className="border-t-1 border-black pt-5">
      <h2 className="font-inter mb-4 text-2xl font-bold">{title}</h2>
      <p className="pr-20 text-sm">{desc}</p>
    </div>
  );
};

export default List;
