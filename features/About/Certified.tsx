import React from "react";
import clsx from "clsx";

interface CertifiedProps {
  className?: string;
}

const Certified: React.FC<CertifiedProps> = ({ className }) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center gap-8 px-8 py-10 lg:flex-row",
        className,
      )}
    >
      <div className="relative flex h-[30rem] w-[400px] flex-col gap-8">
        <video
          loop
          muted
          autoPlay
          playsInline
          controls
          className="h-full w-full object-cover"
        >
          <source src="/about-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="font-arabic flex-1 space-y-10">
        <div className="font-arabic">
          <h1 className="mb-4 text-2xl font-bold">
            Certified to Lead with Quality
          </h1>
          <p>
            ISO 9001:2015 certified processes ensure consistent quality at every stage — 
            from material selection and robotic fabrication to final hydro testing and inspection.
          </p>
        </div>
        <div className="font-arabic space-y-5">
          <h1 className="mb-4 text-2xl font-bold">
            Driven by Purpose. Powered by Robotics.
          </h1>
          <p>
            Robotic engineering sits at the core of everything we build. 
            By combining hands-on fire-safety expertise with advanced automation, 
            we deliver systems that are accurate, repeatable, and ready to perform — 
            project after project.
          </p>
          <p>
            We don’t just fabricate piping systems. We engineer reliability for environments 
            where failure is not an option.
          </p>
        </div>
        <div className="font-arabic space-y-5">
          <h1 className="mb-4 text-2xl font-bold">Excellence You Can Rely On</h1>
          <p>
            Transparency, precision, and accountability guide every decision we make. 
            The result is fire-safety infrastructure that offers long-term protection, 
            faster execution, and measurable performance.
          </p>
          <p>
            Our goal is simple — to make every project safer through intelligent, robotic engineering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Certified;
