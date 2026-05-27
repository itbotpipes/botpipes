"use client";

import NumberCard from "@/components/NumberCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const cards = [
  {
    id: "1",
    title: "Design & Engineering",
    card: "/cards/Design & Engineering.png",
    details:
      "Our engineering team crafts precise 3D layouts using advanced CAD/CAM tools, ensuring every bend, angle, and measurement is spot-on before the first cut is made.",
    color: "rgba(36, 39, 94, 1)",
    color2: "rgb(255,255,255)",
  },
  {
    id: "2",
    title: "Precision Manufacturing",
    card: "/cards/precision.png",
    details:
      "State-of-the-art automation handles cutting, welding, and assembly with micrometer accuracy—delivering clean welds, perfect alignments, and repeatable perfection every single time.",
    color: "#58E4E0",
    color2: "#6874FE",
  },
  {
    id: "3",
    title: "Quality & Testing",
    card: "/cards/QualityTesting.png",
    details:
      "Every component is put through robust quality checks, coating inspection, and dimensional verification to ensure strength, durability, and leak-proof performance.",
    color: "#62f0fa",
    color2: "#abfb31",
  },
  {
    id: "4",
    title: "Packaging & Safe Dispatch",
    card: "/cards/packaging.png",
    details:
      "Systems are securely packaged, labeled, and shipped as plug-and-play assemblies to minimize site work, protect components, and speed up installation.",
    color: "#f50b54",
    color2: "#f9a88e",
  },
];

const AnimatedCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardIndx, setCardIndx] = useState(0);
  const globalTl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (globalTl.current) {
      globalTl.current.tweenTo(`card-${cardIndx}`);
    }
  }, [cardIndx]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const cardsEl = containerRef.current?.querySelectorAll(".img-card");
      const textEl = containerRef.current?.querySelectorAll(".card-text");
      if (!cardsEl || !textEl) return;

      gsap.set(cardsEl, {
        zIndex: (indx) => cardsEl.length - indx,
        rotate: (indx) => {
          if (indx === 0) return "0deg";
          const pos = indx - 1;
          return pos % 2 === 0 ? "20deg" : "-20deg";
        },
      });

      mm.add("(min-width: 768px)", () => {
        gsap.set(textEl, {
          filter: (indx) => (indx === 0 ? "" : "blur(2px)"),
          scale: (indx) => (indx === 0 ? 1 : 0.7),
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom+=1000",
            scrub: true,
            pin: true,
          },
        });

        cards.forEach((item, indx) => {
          const currCard = cardsEl[indx];
          const nextCard = cardsEl[indx + 1];

          const currText = textEl[indx];
          const nextText = textEl[indx + 1];

          if (!nextCard || !nextText) return;

          const subTl = gsap.timeline();

          subTl.to(currCard, {
            xPercent: -200,
            yPercent: 10,
            duration: 5,
          });

          subTl.to(
            nextCard,
            {
              rotate: "0deg",
              duration: 5,
            },
            0,
          );

          subTl.to(
            currText,
            {
              filter: "blur(2px)",
              scale: 0.7,
              duration: 2,
            },
            0,
          );

          subTl.to(
            nextText,
            {
              filter: "blur(0px)",
              scale: 1,
              duration: 2,
            },
            0,
          );

          tl.add(subTl);
        });
      });

      mm.add("(max-width: 767px)", () => {
        globalTl.current = gsap.timeline({ paused: true });

        cards.forEach((item, indx) => {
          const currCard = cardsEl[indx];
          const nextCard = cardsEl[indx + 1];
          const cardTextCont =
            containerRef.current?.querySelector(".card-text-cont");

          if (!nextCard || !globalTl || !cardTextCont) return;
          globalTl.current?.addLabel(`card-${indx}`);

          const subTl = gsap.timeline();

          subTl.to(currCard, {
            xPercent: -200,
            yPercent: 10,
            duration: 1,
          });

          subTl.to(
            nextCard,
            {
              rotate: "0deg",
              duration: 1,
            },
            0,
          );

          subTl.to(
            cardTextCont,
            {
              xPercent: -((indx + 1) * 100),
            },
            0,
          );

          globalTl.current?.add(subTl);
        });
      });
    },
    { scope: containerRef },
  );

  const handleCardIncrement = () => setCardIndx((state) => state + 1);

  const handleCardDecrement = () => setCardIndx((state) => state - 1);

  return (
    <div
      ref={containerRef}
      className="flex h-screen flex-col-reverse py-20 md:flex-row"
    >
      <div className="relative z-20 mb-4 flex justify-between md:hidden">
        <button
          disabled={cardIndx === 0}
          onClick={handleCardDecrement}
          className="disabled:text-gray-300"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          disabled={cardIndx === cards.length - 1}
          onClick={handleCardIncrement}
          className="disabled:text-gray-300"
        >
          <ChevronRight size={40} />
        </button>
      </div>

      <div className="relative flex-1">
        {cards.map((item, indx) => (
          <NumberCard
            key={indx}
            imageSrc={item.card}
            description={item.title}
            details={item.details}
            number={(indx + 1).toString()}
            color={item.color}
            color2={item.color2}
            className="img-card absolute top-0 left-[10%] scale-80 lg:left-0"
          />
          // <Image
          //   key={indx}
          //   src={item.card}
          //   alt={item.card}
          //   className="img-card absolute top-0 left-0 h-fit min-w-full scale-90 object-contain"
          // />
        ))}
      </div>

      <div className="h-[7rem] w-full overflow-x-hidden overflow-y-visible md:h-full md:flex-1 md:py-20">
        <div className="card-text-cont flex w-full md:flex-col md:justify-center md:gap-20">
          {cards.map((item, indx) => (
            <h1
              className="card-text h-fit max-w-full min-w-full shrink-0 grow-1 origin-left text-center text-4xl md:text-left"
              key={indx}
            >
              {item.title}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedCards;
