import useMediaQuery from "@/components/hooks/useMediaQuery";
import { TestimonialRecord } from "@/lib/firebase/firestore/testimonials";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef, useEffect } from "react";

gsap.registerPlugin(useGSAP);

export default function useTestimonials(testimonials: TestimonialRecord[]) {
  const [currTestimonial, setCurrTestimonial] = useState(testimonials[0]?.id);
  const containerRef = useRef<HTMLDivElement>(null);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const runAnimation = () => {
    const parent = testimonialContainerRef.current;
    const children = parent?.children;
    if (!children || !parent) return;

    const tl = gsap.timeline();

    // left translate shift animation
    const translateAmount = (parent.firstElementChild as HTMLElement)
      .offsetWidth;
    tl.to(parent, {
      x: `-=${translateAmount}`,
      duration: 1,
      onComplete: () => {
        const children = Array.from(parent.children);
        const firstChild = children.shift();
        if (!firstChild) return;
        parent.appendChild(firstChild);
        gsap.set(parent, { x: 0 });
      },
    });

    // Color shift animation
    const secondChild = parent.children[1];
    const nextSecondChild = parent.children[2];
    if (secondChild && nextSecondChild) {
      tl.to(
        secondChild.firstElementChild,
        {
          color: "black",
          background: "#E9E9EE",
          duration: 0.8,
        },
        0,
      );

      tl.to(
        nextSecondChild.firstElementChild,
        {
          color: "white",
          background: "#24275E",
          duration: 0.8,
        },
        0,
      );
    }
  };

  useEffect(() => {
    const interval = !isMobile ? setInterval(runAnimation, 4000) : null;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const container = testimonialContainerRef.current;
    if (!container) return;

    const children = Array.from(container.children);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = children.indexOf(entry.target);
            setCurrTestimonial(testimonials[index].id);
          }
        });
      },
      {
        threshold: 0.6,
      },
    );

    children.forEach((child) => observer.observe(child));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return {
    currTestimonial,
    containerRef,
    testimonialContainerRef,
  };
}
