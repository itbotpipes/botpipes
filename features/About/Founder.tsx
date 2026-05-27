import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";
import ChildrenStaggerContainer from "@/components/ChildrenStaggerContainer";

interface FounderProps {
  className?: string;
}

const Founder: React.FC<FounderProps> = ({ className }) => {
  return (
    <div
      id="founder"
      className={clsx(
        "grid min-h-[50rem] grid-cols-1 gap-12 py-15 md:grid-cols-2",
        className,
      )}
    >
      <div className="font-urbanist flex flex-col">
        <h1 className="font-urbanist text-4xl font-semibold">
          Meet Our Founder
        </h1>
        <p className="font-arabic mb-20 text-sm">
          Leading with Innovation & Integrity
        </p>
        <h2 className="text-lg font-bold">Chinmay Northen star</h2>
        <p className="font-arabic mb-10 text-sm">
          Founder, CEO, Botpipes Tech{" "}
        </p>
        <ChildrenStaggerContainer start="start 80%" className="space-y-6">
          <p className="text-sm">
            With a vision to revolutionize India’s fire-safety infrastructure,
            <strong>Chinmay Northen Star</strong> founded{" "}
            <strong>Botpipes Tech Pvt. Ltd</strong>. to bring automation,
            precision, and accountability to an industry that directly
            safeguards lives. Under his leadership, the company has grown from a
            concept-driven startup into a{" "}
            <strong>
              nationally recognized name in robotic prefabrication and
              fire-safety engineering. His deep understanding of manufacturing
              technology, process efficiency, and quality assurance
            </strong>{" "}
            has been instrumental in shaping Botpipes Tech’s reputation for
            reliability and innovation.
          </p>
          <p className="text-sm">
            Driven by a belief that
            <strong>
              “safety should never be compromised, and quality should never be
              delayed,”
            </strong>{" "}
            Chinmay continues to push the boundaries of what’s possible —
            empowering teams, integrating advanced robotics, and creating
            systems that set{" "}
            <strong>new benchmarks for speed, accuracy, and trust.</strong>
          </p>
        </ChildrenStaggerContainer>
      </div>

      <Image
        src="/about/founder.jpg"
        alt="founder"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default Founder;
