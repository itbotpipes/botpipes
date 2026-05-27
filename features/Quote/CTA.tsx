import React from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

interface BenefitItem {
  title: string;
  desc: string;
}

interface CTAProps {
  className?: string;
}

const benefits: BenefitItem[] = [
  {
    title: "Robotic Accuracy",
    desc: "ABB-powered welding and cutting ensures ±1mm precision.",
  },
  {
    title: "Leak-Proof Guarantee",
    desc: "100% hydro-tested assemblies.",
  },
  {
    title: "Smart Costing",
    desc: "Optimized cutting plan reduces wastage and project cost.",
  },
  {
    title: "Faster Turnaround",
    desc: "Complete prefabrication in days, not weeks.",
  },
  {
    title: "Ready-to-Install Deliveries",
    desc: "Numbered, labeled, and packed per zone.",
  },
];

const CTA: React.FC<CTAProps> = ({ className }) => {
  return (
    <div className={clsx("w-full bg-gray-50 px-4 py-20", className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div className="font-raleway space-y-2">
            <h2 className="text-xl font-semibold md:text-2xl">
              Looking to bring your project to life?
            </h2>
            <h1 className="text-4xl font-bold md:text-6xl">
              Get A <span className="text-[#27408A]">Free</span> Custom
              <br />
              Quote Today!
            </h1>
          </div>

          <p className="font-lato md:text-lg">
            Whether you&apos;re planning a{" "}
            <strong>large-scale industrial installation</strong> or a{" "}
            <strong>one-time fabrication project</strong>, we&apos;ll create a{" "}
            <strong>tailored solution</strong> that fits your scope, timeline,
            and budget.
          </p>
          <p className="font-lato md:text-lg">
            Share your requirements, and our team will prepare a detailed cost
            estimate with transparent pricing and expert recommendations.
          </p>
        </div>

        <div className="flex-1 rounded-xl bg-white p-8 shadow-lg lg:w-[450px]">
          <div className="space-y-6">
            <div>
              <h3 className="font-urbanist mb-2 text-xl font-medium">
                Custom Project
              </h3>
              <p className="font-arabic text-sm font-medium text-gray-600">
                Don&apos;t need a full package? We also handle{" "}
                <strong>one-off projects</strong> and specialized assignments
                for <strong>both small and large scopes</strong>.
              </p>
            </div>

            <Button className="w-full rounded-full bg-[#27408A] py-6 text-lg font-semibold text-white hover:bg-[#1b2d61]">
              Get My Free Quote
            </Button>

            <div>
              <h3 className="font-urbanist mb-4 text-xl font-medium">
                Why Choose BOTPipes for Prefabrication
              </h3>
              <ul className="font-arabic space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 text-[#27408A]">•</span>
                    <div>
                      <strong className="text-sm">{benefit.title}</strong>
                      <span className="text-sm text-gray-600">
                        {" "}
                        – {benefit.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
