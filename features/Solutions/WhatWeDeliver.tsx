"use client"

import Image from "next/image";
import { motion } from "motion/react";

const deliverData = [
    {
        text: "Custom pipe spools",
        image: "/gallery/14.jpeg",
    },
    {
        text: "Headers & riser assemblies",
        image: "/gallery/54.jpeg",
    },
    {
        text: "Branch networks for sprinklers & hydrants",
        image: "/gallery/52.jpeg",
    },
    {
        text: "Factory-assembled manifolds and fittings",
        image: "/gallery/16.jpeg",
    },
]

const WeDeliver = () => {
    return (
        <div className="mx-auto max-w-[65rem] flex flex-col items-center space-y-10 mb-20 px-8">
            <motion.div 
                className="w-full flex flex-col items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once:true }}
            >
                <h1 className="font-urbanist font-semibold text-3xl md:text-5xl lg:text-6xl text-center">What We <span className="text-[#24275E]">Deliver!</span></h1>
                <p className="font-arabic text-sm md:text-lg text-center my-5 text-gray-500">
                    Precision-Engineered Prefabricated Fire Piping Systems 
                    We provide complete prefabricated assemblies — including:
                </p>
            </motion.div>
            <div className="flex flex-col md:flex-row flex-wrap p gap-5 w-full">
                {deliverData.map((data) => (
                    <motion.div 
                        key={data.text} 
                        className="
                            bg-white 
                            min-h-80 
                            md:flex-1 
                            w-full 
                            rounded-2xl 
                            hover:shadow-xl 
                            hover:-translate-y-2 
                            transition-transform-shadow
                            duration-300 
                            border 
                            flex 
                            flex-col 
                            items-center 
                            justify-end 
                            p-2 
                            overflow-hidden"
                        initial={{ y:-5, opacity: 0 }}
                        whileInView={{ y:0, opacity: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        viewport={{ once: true }}
                        >
                        <div className="relative md:w-full md:h-full h-60 w-60 mb-2">
                            <Image 
                                src={data.image}
                                alt={data.text}
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                        <button className="group/button cursor-pointer bg-[#24275E] drop-shadow-md relative text-white h-auto md:min-h-20 font-semibold font-urbanist w-full p-3 rounded-md text-sm" type="button">
                            {data.text}
                            <div className="absolute bg-gray-600 bottom-0 h-1.5 w-7 left-1/2 right-1/2 -translate-x-3 rounded-t-sm group-hover/button:bg-gray-200 transition-all duration-300"/>
                        </button>
                    </motion.div>
                ))}
            </div>
            <h3 className="font-inter text-center text-sm">
                Every component is built in a controlled environment, hydro-tested, 
                dimensionally verified, and delivered ready for plug-and-play installation.
            </h3>
        </div>
    );
};

export default WeDeliver;