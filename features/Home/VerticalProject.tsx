"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "./ProjectContainers";
import ParticleBackground from "@/components/ParticleBackground";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyProps {
  className?: string;
}

const projectData = [
  {
    id: 1,
    problem: "Variable Quality & Leakage",
    solution: "ABB robotic welding + Fronius systems with programmed parameters",
    reward: [
      "Leak-free, uniform weld quality",
      "First-time hydro test pass",
      "Reduced failures & warranty risk",
    ],
  },
  {
    id: 2,
    problem: "Slow site work & delays",
    solution:
      "Offsite fabrication in parallel; multiple assemblies produced simultaneously",
    reward: [
      "50–80% faster installation timelines",
      "Plug-and-play assemblies at site",
      "Quicker project handover",
    ],
  },
  {
    id: 3,
    problem: "High onsite labour costs",
    solution:
      "All skilled fabrication completed in factory; site team only installs prefab modules",
    reward: [
      "60–70% reduction in site labour",
      "Lower accommodation & logistics costs",
      "Better cost control and margins",
    ],
  },
  {
    id: 4,
    problem: "Rework, rejects & wastage",
    solution:
      "CNC plasma cutting (±1 mm), precision grooving, robotic jigging",
    reward: [
      "95%+ first-pass yield",
      "Minimal material wastage",
      "Consistent dimensional accuracy",
    ],
  },
  // {
  //   id: 5,
  //   problem: "Poor documentation & compliance",
  //   solution:
  //     "Digital QC records, weld logs, test certificates, hydro-test reports",
  //   reward: [
  //     "Audit-ready documentation",
  //     "Faster consultant & authority approvals",
  //     "NFPA / IS / UL / FM compliance",
  //   ],
  // },
  // {
  //   id: 6,
  //   problem: "Site disruption & safety hazards",
  //   solution:
  //     "All welding and coating done in factory; cold installation at site",
  //   reward: [
  //     "Zero hot-work permits onsite",
  //     "Safer working environments",
  //     "Fewer stoppages & disruptions",
  //   ],
  // },
  // {
  //   id: 7,
  //   problem: "Unpredictable costs & overruns",
  //   solution:
  //     "Fixed per-meter pricing with controlled factory manufacturing",
  //   reward: [
  //     "Cost certainty from day one",
  //     "Predictable cash flow",
  //     "Improved project profitability",
  //   ],
  // },
  // {
  //   id: 8,
  //   problem: "Long lead times for spares & support",
  //   solution:
  //     "Planned inventory with in-house automated production",
  //   reward: [
  //     "Faster recovery & response times",
  //     "Genuine spares availability",
  //     "Technical support & AMC options",
  //   ],
  // },
  // {
  //   id: 9,
  //   problem: "Limited customization",
  //   solution:
  //     "3D CAD-based bespoke design with engineered layouts",
  //   reward: [
  //     "Custom-fit, project-specific systems",
  //     "No field cutting or adjustments",
  //     "Optimized system performance",
  //   ],
  // },
];

const VerticalProject: React.FC<CaseStudyProps> = ({ className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const mm = gsap.matchMedia();

    // ✅ DESKTOP ONLY PINNING
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top+=80",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${className} flex flex-col md:flex-row gap-8 md:gap-12 py-12`}
    >
      {/* LEFT SIDE (PINNED ON DESKTOP) */}
      <div className="md:w-1/2">
        <div ref={pinRef} className="md:pt-8 relative">
          <ParticleBackground 
                        position = "absolute"
                        primaryColor="#24275E"
                      />
          <h2 className="font-urbanist text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Solving Critical Sprinkler{" "}
            <span className="text-[#24275E]">Execution Challenges</span>
          </h2>

          <div className="space-y-4">
            <p className="font-arabic text-sm text-gray-500">
              We design and manufacture{" "}
              <strong>ready-to-install sprinkler</strong> systems using robotic
              welding, plasma cutting, and precision assembly — reducing risks,
              saving time, and ensuring consistent quality on every site.
            </p>

            <p className="font-arabic text-sm text-gray-500">
              Our <strong>automation-driven factory</strong> eliminates manual
              welding errors, minimizes rework, and delivers fully tested,
              powder-coated assemblies engineered for long-term performance and
              safety.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        className="
          md:w-2/4
          flex
          flex-row md:flex-col
          gap-6
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory
          md:snap-none
          pb-4
        "
      >
        {projectData.map((project) => (
          <div
            key={project.id}
            className="min-w-full md:min-w-0 snap-center"
          >
            <Container
              problem={project.problem}
              solution={project.solution}
              reward={project.reward}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalProject;
