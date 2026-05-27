import React from "react";
import StickyContainer from "@/components/StickyContainer";

// import Hero from "@/features/About/Hero";
import Hero from "@/components/Hero";
import AboutSection from "@/features/About/AboutSection";
import Certified from "@/features/About/Certified";
import PhotoGrid from "@/features/About/PhotoGrid";
import Steps from "@/features/About/Steps";
import Mission from "@/features/About/Mission";
import Story from "@/features/About/Story";

// import Founder from "@/features/About/Founder";
// import Team from "@/features/About/Team";
import Testimonials from "@/features/Home/Testimonials";
// import Explore from "@/features/Home/Explore";
import SectionNavigation from "@/features/About/SectionNavigation";
import { getTestimonials } from "@/lib/firebase/firestore/testimonials";

export const revalidate = 60;

async function AboutPage() {
  const testimonials = await getTestimonials().then((items) => {
    if (items.length <= 3) return [...items, ...items];
    return items;
  });

  return (
    <div>
      <Hero text="Engineered to fit, Designed to last" src="/about/hero.png" custom="md:text-5xl text-3xl"/>
      <AboutSection className="mx-auto md:ml-8"/>
      <Certified className="mx-auto md:ml-8"/>
      <PhotoGrid />
      <StickyContainer className="mx-auto flex max-w-[90rem] flex-col gap-20 py-15 lg:flex-row">
        <SectionNavigation />

        <div className="w-full overflow-x-hidden px-4">
          <Steps />
          <Mission className="" />
          <Story className="" />
          {/* <Founder className="" /> */}
          {/* <Team className="" /> */}
          {/* <Testimonials
            testimonials={testimonials}
            className="mb-30 w-full overflow-x-clip"
          /> */}
        </div>
      </StickyContainer>

      {/* <Explore className="py-40" /> */}
    </div>
  );
}

export default AboutPage;
