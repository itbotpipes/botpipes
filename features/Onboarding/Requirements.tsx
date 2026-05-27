import React from "react";
import clsx from "clsx";

interface RequirementsProps {
  className?: string;
}

const materialSuppliers = [
  "Valid business registration and GST compliance",
  "Proven track record in the industry (minimum 2 years)",
  "Quality certifications (ISO or equivalent preferred)",
  "Ability to provide material test certificates",
  "Adequate production/supply capacity",
  "Financial stability and creditworthiness",
];

const serviceProviders = [
  "Relevant licenses and certifications",
  "Trained and qualified personnel",
  "Insurance coverage as applicable",
  "Safety compliance and track record",
  "References from existing clients",
];

const whatWeLookFor: { label: string; desc: string }[] = [
  {
    label: "Quality Focus",
    desc: "Commitment to delivering consistent, specification-compliant products/services",
  },
  {
    label: "Reliability",
    desc: "On-time delivery and responsive communication",
  },
  {
    label: "Competitive Pricing",
    desc: "Fair market rates with value for money",
  },
  {
    label: "Flexibility",
    desc: "Ability to handle varying order sizes and urgent requirements",
  },
  {
    label: "Documentation",
    desc: "Proper invoicing, test certificates, and compliance records",
  },
  {
    label: "Ethical Practices",
    desc: "Transparent dealings and professional conduct",
  },
];

const Requirements: React.FC<RequirementsProps> = ({ className }) => {
  return (
    <section
      className={clsx("bg-gray-50 px-4 py-12 sm:px-6 lg:px-8", className)}
    >
      <div className="">
        <h2 className="font-arabic mb-10 text-5xl font-medium text-gray-900">
          Our Vendor Requirements
        </h2>

        <div>
          <h3 className="font-arabic mb-3 text-xl font-bold text-gray-900">
            Minimum Qualification Criteria
          </h3>
          <p className="mb-6 text-sm text-gray-600">
            To ensure quality and reliability, we require our vendors to meet
            the following baseline standards:
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="font-arabic mb-3 text-xl font-bold">
              For Material Suppliers:
            </h4>
            <ul className="list-outside list-disc space-y-2 pl-6 text-sm text-gray-700">
              {materialSuppliers.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-arabic mb-3 text-xl font-bold">
              For Service Providers:
            </h4>
            <ul className="list-outside list-disc space-y-2 pl-6 text-sm text-gray-700">
              {serviceProviders.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="font-arabic mb-3 text-xl font-bold">
            What We Look For:
          </h4>
          <div className="space-y-3">
            {whatWeLookFor.map((w) => (
              <div
                key={w.label}
                className="flex flex-col items-start space-x-4 md:flex-row"
              >
                <strong className="w-48 flex-shrink-0 text-sm text-gray-900">
                  {w.label} -
                </strong>
                <p className="flex-1 text-sm text-gray-700">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Requirements;
