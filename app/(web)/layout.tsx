import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothWrapper from "@/components/SmoothWrapper";
import ScrollProgressButton from "@/components/ScrollToTop2";
import React from "react";


interface LayoutProps {
  children: React.ReactNode;
}

function layout({ children }: LayoutProps) {
  return (
    <div className="relative bg-white">
       {/* <ParticleBackground /> */}
      {/* GLOBAL GRID BACKGROUND */}
      {/* <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="
            absolute inset-0
            [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
            [background-size:40px_40px]
          "
        />
      </div> */}

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10">
        <ScrollProgressButton />
        <Nav />
        <SmoothWrapper> 
          <ScrollToTop>
            {children}
            <Footer />
          </ScrollToTop>
        </SmoothWrapper> 
      </div>

    </div>
  );
}

export default layout;