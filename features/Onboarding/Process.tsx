import React from "react";
import clsx from "clsx";

interface ProcessProps {
  className?: string;
}

const steps = [
  {
    id: 1,
    title: "Submit Application",
    desc: "Complete the vendor registration form below with accurate company and capability information.",
  },
  {
    id: 2,
    title: "Initial Review",
    desc: "Our procurement team reviews your application and verifies basic qualification criteria.",
  },
  {
    id: 3,
    title: "Documentation Submission",
    desc: "Shortlisted vendors submit required documents for detailed evaluation (typically within 5-7 days).",
  },
  {
    id: 4,
    title: "Assessment",
    desc: "We evaluate quality systems, pricing, capabilities, and conduct reference checks if needed.",
  },
  {
    id: 5,
    title: "Vendor Approval",
    desc: "Approved vendors are added to our approved vendor list and receive vendor code assignment.",
  },
  {
    id: 6,
    title: "Agreement Execution",
    desc: "Commercial terms are finalized and vendor agreement is executed.",
  },
  {
    id: 7,
    title: "First Order",
    desc: "Trial orders are placed to verify quality, delivery, and service standards.",
  },
  {
    id: 8,
    title: "Performance Review",
    desc: "Regular performance evaluation to ensure continued quality and reliability.",
  },
];

const Process: React.FC<ProcessProps> = ({ className }) => {
  return (
    <section
      className={clsx("bg-gray-50 px-4 py-12 sm:px-6 lg:px-8", className)}
    >
      <div>
        <h2 className="font-arabic mb-10 text-5xl font-medium text-gray-900">
          Vendor Onboarding Process
        </h2>

        <h3 className="font-arabic mb-3 text-xl font-bold text-gray-900">
          How to Become an Approved Botpipes Vendor
        </h3>

        <ol className="space-y-6">
          {steps.map((s) => (
            <li key={s.id} className="">
              <div className="">
                <h4 className="font-arabic mb-1 text-sm font-semibold text-gray-900">
                  Step {s.id}: {s.title}
                </h4>
                <p className="text-sm text-gray-700">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
