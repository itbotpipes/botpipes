import React from "react";
import clsx from "clsx";
import ChildrenStaggerContainer from "@/components/ChildrenStaggerContainer";

interface MissionProps {
  className?: string;
}

const Mission: React.FC<MissionProps> = ({ className }) => {
  return (
    <section
      id="mission"
      className={clsx("w-full pt-20 md:pt-28", className)}
    >
      <div className="mx-auto max-w-6xl px-4">
        
        {/* Header with pipe accent */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#24275E]" />
            <span className="text-xs font-semibold tracking-[0.2em] text-[#24275E] uppercase font-urbanist">
              Our Purpose
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#24275E]" />
          </div>
          <p className="text-sm text-neutral-600 max-w-3xl mx-auto font-inter">
            Driven by precision engineering and automation, we are redefining how
            fire-safety systems are built, delivered, and trusted.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Mission Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white border-2 border-neutral-200 transition-all duration-500 hover:border-[#24275E] hover:shadow-2xl">
            {/* Vertical pipe accent */}
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-[#24275E] to-blue-600 opacity-80" />
            
            {/* Corner bolts */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600" />
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600" />
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600" />
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600" />

            <div className="p-8 pl-10">
              <div className="mb-6 flex items-center gap-3">
                {/* Pipe connector icon */}
                <div className="flex items-center gap-1">
                  <div className="w-8 h-1 bg-[#24275E] rounded-full" />
                  <div className="w-3 h-3 rounded-full border-2 border-[#24275E] bg-white" />
                </div>
                <h2 className="font-urbanist text-2xl font-semibold">
                  Our <span className="text-[#24275E]">Mission</span>
                </h2>
              </div>

              <ChildrenStaggerContainer start="start 80%" className="space-y-4">
                <p className="font-arabic text-sm leading-relaxed text-neutral-600">
                  At <strong>Botpipes Tech Pvt. Ltd.</strong>, our mission is to
                  redefine fire-safety prefabrication through robotic engineering.
                  We deliver leak-free, factory-tested systems that reduce
                  on-site complexity and elevate reliability across every project.
                </p>

                <p className="font-arabic text-sm leading-relaxed text-neutral-600">
                  Through automation, precision manufacturing, and strict quality
                  control, we create solutions designed to protect lives and
                  infrastructure—today and for the long term.
                </p>
              </ChildrenStaggerContainer>
            </div>

            {/* Blueprint grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(36, 39, 94, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(36, 39, 94, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          </div>

          {/* Vision Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white border-2 border-neutral-200 transition-all duration-500 hover:border-[#24275E] hover:shadow-2xl">
            {/* Vertical pipe accent */}
            <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-600 to-[#24275E] opacity-80" />
            
            {/* Corner bolts */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600" />
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600" />
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600" />
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-slate-800 border-2 border-slate-600" />

            <div className="p-8 pl-10">
              <div className="mb-6 flex items-center gap-3">
                {/* Pipe connector icon */}
                <div className="flex items-center gap-1">
                  <div className="w-8 h-1 bg-[#24275E] rounded-full" />
                  <div className="w-3 h-3 rounded-full border-2 border-[#24275E] bg-white" />
                </div>
                <h2 className="font-urbanist text-2xl font-semibold">
                  Our <span className="text-[#24275E]">Vision</span>
                </h2>
              </div>

              <ChildrenStaggerContainer start="start 80%" className="space-y-4">
                <p className="font-arabic text-sm leading-relaxed text-neutral-600">
                  To become{" "}
                  <strong>
                    India's most trusted name in robotic fire-safety systems
                  </strong>
                  , setting new benchmarks for precision, performance, and
                  dependability.
                </p>

                <p className="font-arabic text-sm leading-relaxed text-neutral-600">
                  We envision a future where{" "}
                  <strong>
                    automation eliminates uncertainty and engineering enhances safety
                  </strong>
                  —where every system reflects trust, quality, and innovation.
                </p>
              </ChildrenStaggerContainer>
            </div>

            {/* Blueprint grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(36, 39, 94, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(36, 39, 94, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          </div>
        </div>

        {/* Bottom pipe connector accent */}
        {/* <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-2 opacity-40">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <div className="w-24 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            <div className="w-3 h-3 rounded-full border-2 border-slate-400 bg-white" />
            <div className="w-24 h-px bg-gradient-to-l from-slate-400 to-transparent" />
            <div className="w-2 h-2 rounded-full bg-slate-400" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Mission;