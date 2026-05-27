import React from "react";
import clsx from "clsx";
import MainButton from "@/components/MainButton";
import CareerForm from "./CareerForm";

interface SearchProps {
  className?: string;
}
interface ISearchItem {
  title: string;
  desc: string;
  link: string;
}

const searchItems: ISearchItem[] = [
  {
    title: "Estimator",
    desc: `We are looking for an Estimator with experience in construction to
      lead the preparation of accurate cost estimates and support the
      delivery of competitive, well-informed project bids. This role requires
      collaboration across the Pre-Construction and wider team shaping
      competitive bids and ensuring financial viability.  Strong analytical
      skills, industry knowledge, and a proactive approach to problem-
      solving are essential to support project planning and delivery.`,
    link: "",
  },
  {
    title: "Project Manager",
    desc: `We are looking for a Project Manager with experience in rail
      infrastructure or related sectors to oversee the planning and
      execution of project deliverables. This role requires strong leadership, 
      excellent communication, and a deep understanding of technical workflows. 
      This role will also coordinate multi-disciplinary teams, including those 
      working on automation and robotics systems integrated into modern rail operations.
      Experience working with advanced digital tools and platforms—such as Botpipes for automated process management—will be a strong advantage.`,
    link: "",
  },
];

const Search: React.FC<SearchProps> = ({ className }) => {
  return (
    <div className={clsx("grid grid-cols-1 gap-8 md:grid-cols-3", className)}>
      <h1 className="text-4xl font-semibold">Available Roles</h1>
      {/* <div className="h-fit rounded-xl border-1 border-[#24272E] p-5">
        <h1 className="font-urbanist mb-5">Refine your search</h1>
        <div className="space-y-3">
          <div>Category</div>
          <div>Job Type</div>
        </div>
      </div> */}

      <div className="flex flex-col gap-10 py-8 md:col-span-2">
        {searchItems.map((item, indx) => (
          <SearchItem key={indx} {...item} />
        ))}
      </div>
    </div>
  );
};

const SearchItem: React.FC<ISearchItem> = ({ title, desc }) => {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h1 className="font-urbanist text-xl font-bold">{title}</h1>
        {/* <MainButton text="Apply Now" /> */}
        <CareerForm />
      </div>

      <p className="text-sm">{desc}</p>
    </div>
  );
};

export default Search;
