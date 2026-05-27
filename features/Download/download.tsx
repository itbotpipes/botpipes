"use client"

import React from "react";
import { motion } from "motion/react";
import MainButton from "@/components/MainButton";
import Image from "next/image";

const downloadData = [
    {
        id:1,
        title:"Lorem Ipsum",
        image:"/imgs/left1.png",
        link:"",
    },
    {
        id:2,
        title:"Lorem Ipsum",
        image:"/imgs/right2.jpg",
        link:"",
    },
    {
        id:3,
        title:"Lorem Ipsum",
        image:"/imgs/right2.jpeg",
        link:"",
    },
    {
        id:4,
        title:"Lorem Ipsum",
        image:"/imgs/center.png",
        link:"",
    },
];

interface DownloadPageProps {
    className?:string;
}

const DownloadPage: React.FC<DownloadPageProps> = ({ className }) => {
    return (
        <div className={`flex flex-col py-10 px-7 space-y-5 items-center ${className}`}>
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
                {downloadData.map((data) => (
                    <motion.div
                        key={data.id}
                        className="group relative mb-8 h-[20rem] w-full bg-black cursor-pointer"
                    >
                        <p 
                            className="absolute font-arabic font-semibold z-50 bottom-10 left-10 text-xl text-white flex flex-col"
                        >
                            {data.title}
                            <span 
                                className="bg-white h-0.25 w-0 group-hover:w-full transition-all duration-300"
                            />
                        </p>
                        <Image 
                            src={data.image}
                            alt={data.title}
                            className="object-cover opacity-65"
                            fill
                        />
                    </motion.div>
                ))}
            </div>
            {/* <MainButton 
                variant={"primary"}
                text={"View All"}
            /> */}
        </div>
    )
}

export default DownloadPage;