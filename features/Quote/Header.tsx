import React from "react";
import clsx from "clsx";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <section className={clsx("px-4 py-12 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-urbanist mb-8 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          Let’s Build Your Project — Faster, Smarter, and Safer
        </h2>

        <p className="font-arabic mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
          At <strong className="font-semibold">BOTPipes</strong>, we turn your
          fire-safety designs into{" "}
          <strong className="font-semibold">
            ready-to-install prefabricated systems
          </strong>
          — with <strong className="font-semibold">robotic precision</strong>,{" "}
          <strong className="font-semibold">zero leakage</strong>, and{" "}
          <strong className="font-semibold">on-time delivery</strong>. Whether
          you’re a consultant, contractor, or project owner, our quoting process
          is designed to be{" "}
          <strong className="font-semibold">
            simple, transparent, and lightning fast
          </strong>
          .
        </p>
      </div>
    </section>
  );
};

export default Header;
