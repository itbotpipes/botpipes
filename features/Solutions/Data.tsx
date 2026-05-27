import React from "react";

export const features: { title: string; desc: React.ReactNode; img: string }[] =
  [
    {
      title: "Patented Technology",
      desc: (
        <>
          Our team of <strong>fire-safety and automation engineers</strong>
          continuously develops{" "}
          <strong>cutting-edge robotic innovations</strong>
          for pipe prefabrication and flow monitoring.
        </>
      ),
      img: "/solution/features/1.png",
    },
    {
      title: "Extreme Accuracy in Harsh Environments",
      desc: (
        <>
          Our systems maintain <strong>stable accuracy</strong> even under
          fluctuating site conditions, such as temperature variations, humidity,
          and pressure changes.
        </>
      ),
      img: "/solution/features/2.png",
    },
    {
      title: "Wide Dynamic Range",
      desc: (
        <>
          With a <strong>1:1000 turndown ratio</strong> and optimized design
          flexibility, a single Botpipes system can handle
          <strong> multiple operational flow ranges</strong> — reducing the need
          for multiple configurations or field adjustments.
        </>
      ),
      img: "/solution/features/3.png",
    },
    {
      title: "Compact & Lightweight Design",
      desc: (
        <>
          Built for <strong>seamless site integration</strong>, our modular
          prefabrication design allows easy{" "}
          <strong>transport, installation, and maintenance</strong>, even in
          tight or high-rise locations.
        </>
      ),
      img: "/solution/features/4.png",
    },
    {
      title: "Solid-State Reliability",
      desc: (
        <>
          With <strong>no moving parts</strong> in critical zones, our robotic
          process minimizes wear, obstructions, and operational failures. This
          delivers unmatched{" "}
          <strong>system longevity and uptime reliability</strong>.
        </>
      ),
      img: "/solution/features/5.png",
    },
    {
      title: "Smart Connectivity & Integration",
      desc: (
        <>
          Our technology supports{" "}
          <strong>digital integration and data-driven control</strong> —
          compatible with PLC, CAN bus, Modbus, and analog systems.
        </>
      ),
      img: "/solution/features/6.png",
    },
  ];

export const productBenefits: {
  title: string;
  desc: React.ReactNode;
  img: string;
}[] = [
  {
    title: "Reliable in Demanding Site Conditions",
    desc: (
      <>
      Our prefabricated fire-safety systems perform consistently in high-vibration,
      temperature-sensitive, and industrial environments, ensuring dependable 
      operation where reliability matters most.
      </>
    ),
    img: "/solution/benefit/reliable.jpeg",
  },
  {
    title: "Faster, Cleaner Installation",
    desc: (
      <>
        Offsite prefabrication enables quick, plug-and-play installation with minimal 
        site work — ideal for tight spaces, live buildings, and retrofit projects.
      </>
    ),
    img: "/solution/benefit/2.png",
  },
  {
    title: "Accuracy That Lasts",
    desc: (
      <>
        Robotic fabrication ensures precise alignment and dimensional stability over time, 
        reducing rework, maintenance issues, and performance deviations after installation.
      </>
    ),
    img: "/solution/benefit/accuracy.jpeg",
  },
];
