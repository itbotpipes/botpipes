import Image from "next/image";

interface containerProps {
    className?: string;
    problem: string;
    solution: string;
    reward: string[];
}

const Container: React.FC<containerProps> = ({ className, problem, solution, reward }) => {
    return (
        <div className={`${className} 
            p-6 rounded-2xl border
            border-[#24275E]/25 
            bg-white 
            space-y-5
            flex
            flex-col
            hover:bg-[#24275E]
            group
            duration-300
            transition-colors
        `}>
            <h1 className="font-urbanist font-bold text-3xl group-hover:text-white duration-300
            transition-colors">{problem}</h1>
            <p className="font-arabic group-hover:text-white duration-300 transition-colors text-gray-500 text-sm">
                Our Solution
            </p>
            <div className="h-0.5 w-full bg-gray-300"/>
                <p className="font-arabic text-gray-700 text-lg group-hover:text-white/75 duration-300 transition-colors">
                    {solution}
                </p>
                <ul className="leading-relaxed mb-6 md:mb-8 space-y-2">
                    {reward.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-start gap-2 group-hover:text-white duration-300 transition-colors text-xs md:text-sm text-gray-600"
                    >
                        <Image
                        src="/checked-filled.png"
                        alt="checked"
                        width={14}
                        height={14}
                        className="group-hover:invert-100 duration-300 transition-all mt-1 shrink-0"
                        />
                        {item}
                    </li>
                    ))}
              </ul>
        </div>    
    );
};

export default Container;