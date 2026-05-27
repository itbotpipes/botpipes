import Image from "@/components/Image";
import React from "react";
import PrefabImg from "./PrefabImg";

const delivery = [
  {
    title: "Robotic Welding",
    desc: (
      <>
        Consistent, leak-free joints every time — powered by{" "}
        <strong>ABB robotic arms</strong> and{" "}
        <strong>Fronius welding technology</strong> for precision and
        repeatability.
      </>
    ),
  },
  {
    title: "Powder-Coated Protection",
    desc: (
      <>
        Durable, corrosion-resistant finish that extends product life and
        ensures a clean, ready-to-install appearance on-site.
      </>
    ),
  },
  {
    title: "Certified Compliance",
    desc: (
      <>
        Every assembly is <strong>UL/FM tested</strong>, hydro-pressure
        verified, and accompanied by full documentation — including weld logs,
        coating tests, and quality certificates.
      </>
    ),
  },
];

const benefits = [
  {
    title: "Zero On-Site Welding",
    desc: <>Every joint is factory sealed and tested.</>,
  },
  {
    title: "Faster Installation Cycles",
    desc: (
      <>
        Cut project timelines by up to <strong>50%</strong>.
      </>
    ),
  },
  {
    title: "Quality You Can Trace",
    desc: <>Full batch reports, mill certificates, and test records.</>,
  },
];

const Prefab = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto my-5 w-screen max-w-[65rem] px-4">
        <div className="mb-20">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <h1 className="font-urbanist text-4xl font-semibold">
              Delivering safer projects with{" "}
              <span className="text-[#24275E]">robotic prefabrication</span>
            </h1>
            <div className="space-y-4">
              <p className="font-arabic text-sm text-gray-500">
                We design and manufacture{" "}
                <strong>ready-to-install sprinkler</strong> systems using
                robotic welding, plasma cutting, and precision assembly —
                reducing risks, saving time, and ensuring consistent quality on
                every site.
              </p>
              <p className="font-arabic text-sm text-gray-500">
                Our <strong>automation-driven factory</strong> eliminates manual
                welding errors, minimizes rework, and delivers fully tested,
                powder-coated assemblies engineered for long-term performance
                and safety.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="mx-auto mb-12 grid max-w-[40rem] grid-cols-1 gap-12 lg:mb-40 lg:max-w-full lg:grid-cols-2">
            <PrefabImg
              direction="left"
              src={"/services/tube.jpg"}
              items={delivery}
            />

            <PrefabImg
              className="mt-20"
              direction="right"
              src={"/services/pipe.jpg"}
              items={benefits}
            />
          </div>

          {/* <Image
            src="/services/more-pipes.jpg"
            alt="pip"
            className="mx-auto h-auto max-h-[25rem] w-full max-w-[40rem] object-cover"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Prefab;
