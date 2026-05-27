import React from "react";
import clsx from "clsx";
import PaymentTerms from "./PaymentTerms";
import PaymentTerms2 from "./PaymentTerms2";
import BankInfo from "./BankInfo";

interface CommercialInfoProps {
  className?: string;
}

const CommercialInfo: React.FC<CommercialInfoProps> = ({ className }) => {
  return (
    <section className={clsx("", className)}>
      <h3 className="mb-8 text-center text-3xl font-medium uppercase">
        Commercial Information
      </h3>

      <div className="space-y-10">
        <PaymentTerms />

        <PaymentTerms2 />

        <BankInfo />
      </div>
    </section>
  );
};

export default CommercialInfo;
