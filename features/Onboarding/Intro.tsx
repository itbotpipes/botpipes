import React from "react";
import clsx from "clsx";

interface IntroProps {
  className?: string;
}

const Intro: React.FC<IntroProps> = ({ className }) => {
  return (
    <section className={clsx("px-4 py-12 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-[85rem]">
        <h1 className="font-urbanist mb-10 text-center text-4xl font-bold">
          Partner With India&apos;s Leading Prefabricated Fire Sprinkler
          Manufacturer
        </h1>

        <div className="mb-10 space-y-6">
          <div className="lg:col-span-7">
            <h1 className="font-arabic text-3xl leading-tight font-medium text-gray-900 md:text-5xl">
              Why Become a Botpipes Vendor?
            </h1>
          </div>

          <div className="lg:ml-50">
            <p className="max-w-md text-base text-gray-700">
              At Botpipes Tech Pvt Ltd, we believe in building strong, mutually
              beneficial partnerships with our vendors and suppliers. Our
              commitment to manufacturing excellence starts with sourcing
              quality materials and services from reliable partners who share
              our values of precision, quality, and reliability.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="lg:col-span-7">
            <h2 className="font-arabic text-3xl leading-tight font-medium text-gray-900 md:text-5xl">
              What We Offer Our Vendor Partners:
            </h2>
          </div>

          <div className="lg:ml-50">
            <ul className="list-outside list-disc space-y-3 text-gray-800 [&>li]:ml-6">
              <li>
                <strong>Consistent Business Volume</strong> - Regular orders
                from our growing manufacturing operations
              </li>
              <li>
                <strong>Timely Payments</strong> - Professional payment terms
                and on-time settlements
              </li>
              <li>
                <strong>Long-Term Relationships</strong> - We value
                partnerships, not just transactions
              </li>
              <li>
                <strong>Growth Opportunity</strong> - Expand with us as we scale
                our operations
              </li>
              <li>
                <strong>Professional Operations</strong> - Clear specifications,
                organized procurement, and responsive communication
              </li>
              <li>
                <strong>Fair Dealing</strong> - Transparent evaluation criteria
                and ethical business practices
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
