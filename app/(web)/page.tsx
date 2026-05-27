import About from "@/features/Home/About";
// import Explore from "@/features/Home/Explore";
import Faq from "@/features/Home/Faq";
import Hero from "@/features/Home/Hero";
import Metrics from "@/features/Home/Metrics";
import Prefab from "@/features/Home/Prefab";
import Process from "@/features/Home/Process";
import Products from "@/features/Home/Products";
import Projects from "@/features/Home/Projects";
import Proof from "@/features/Home/Proof";
import Reasons from "@/features/Home/Reasons";
import Services from "@/features/Home/Services";
import Testimonials from "@/features/Home/Testimonials";
import Video from "@/features/Home/Video";
import { getFaqs } from "@/lib/firebase/firestore/faq";
import { getTestimonials } from "@/lib/firebase/firestore/testimonials";
import StackedCards from "@/features/Home/ProjectsNew";
import VerticalProject from "@/features/Home/VerticalProject";
import Latest from "@/features/LatestBlogs/page";

export const revalidate = 60;

export default async function Home() {
  const testimonials = await getTestimonials().then((items) => {
    if (items.length <= 3) return [...items, ...items];
    return items;
  });

  const faqs = await getFaqs().then((faqs) =>
    faqs.filter((faq) => faq.homepage),
  );

  return (
    <div className="pb-15">
      <Hero />
      <About />
      <Services />
      <Reasons />
      <StackedCards />
      <Video />
      <Process />
      <Metrics />
      <VerticalProject className="mx-auto max-w-7xl px-6"/>
      <Faq faqs={faqs} />
      {/* <Testimonials
        testimonials={testimonials}
        className="mx-auto my-30 w-screen max-w-[65rem] px-4"
      /> */}
      {/* <Proof /> driven by precision */}
      {/* <Projects /> */}
      {/*<Products />*/}
      {/* <Prefab /> */}
      <Latest />
      {/* <Explore className="py-10" /> */}
    </div>
  );
}
