import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";

interface TeamProps {
  className?: string;
}

const team = [
  {
    img: "/about/team/1.jpg",
  },
  {
    img: "/about/team/2.jpg",
  },
  {
    img: "/about/team/3.jpg",
  },
  {
    img: "/about/team/4.jpg",
  },
  {
    img: "/about/team/5.jpg",
  },
  {
    img: "/about/team/6.jpg",
  },
  {
    img: "/about/team/7.jpg",
  },
];

const Team: React.FC<TeamProps> = ({ className }) => {
  return (
    <div id="teams" className={clsx("min-h-screen py-15", className)}>
      <h1 className="font-urbanist mb-12 text-4xl font-bold">Team</h1>
      <div className="grid auto-rows-[1fr] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {team.map((item, indx) => (
          <div key={indx}>
            <Image
              src={item.img}
              alt="member"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
