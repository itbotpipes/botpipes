import React from "react";
import ImageAnimation from "./ImageAnimation";

const About = () => {
  return (
    <div className="my-15 w-screen overflow-hidden">
      <div className="mx-auto mb-8 grid max-w-[75rem] grid-cols-1 px-4 md:grid-cols-2">
        <h1 className="font-urbanist mb-4 text-3xl font-semibold uppercase md:mb-0">
          Leading the Future of Fire Protection with<br />
          <span className="text-[#24275E] text-4xl">Robotic Engineering</span>
        </h1>
        <p className="font-arabic text-sm/relaxed">
          {/* India's pioneering robotic manufacturing facility for fire safety piping.
          We combine custome engineering with state-of-the-art automation to produce {" "}
          <strong>pre-assembled, factory-tested</strong> systems that install
          seamlessly. Expreince reduced {" "} <strong>installation time, minimal onsite labour,
            and superior quality control</strong>—all while meeting international fire safety standards. */}
            Robotics ensures accuracy that the human hand can’t match. 
            Every pipe is fabricated and tested with automated precision, 
            reducing errors, saving installation time, and delivering reliability 
            that stands the test of real-world demands.
        <br/>
        <br/>
        {/* <strong><i>Our promise:</i></strong> Robotics-powered fabrication delivers {" "} <strong>speed, accuracy, and reliability</strong> that traditional methods cannot match. */}
        <strong><i>Smarter engineering. Stronger systems. Superior outcomes</i></strong>
        </p>
      </div>
      <ImageAnimation />
    </div>
  );
};

export default About;
