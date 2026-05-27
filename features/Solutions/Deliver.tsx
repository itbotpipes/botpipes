import SplitText from "@/components/SplitText";

const Deliver = () => {
    
    return (
        <div className="mx-auto max-w-[60rem] px-4 py-20 space-y-5">
            <h1 className="text-center">
                <SplitText
                    text=" "
                    custom=" "
                    className="pb-2 text-3xl md:text-4xl font-semibold text-center font-urbanist"
                    delay={100}
                    duration={0.7}
                    ease="power3.out"
                    splitType="lines"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.4}
                    rootMargin="-100px"
                    textAlign="center"
                    tag="h1"
                />
            </h1>
            <SplitText
                    text="
                    Industrial fire-safety systems deserve the same engineering rigor as any critical infrastructure. 
                    Yet most sites today still rely on manual welding, on-site fabrication, and uneven quality control — 
                    leading to leaks, delays, rework, and risk to project schedules and safety. 

                    BotPipes changes that. We deliver factory-engineered, robot-fabricated sprinkler and hydrant piping 
                    systems that arrive ready to install, with guaranteed quality, documented compliance, and predictable 
                    performance.
                    "
                    custom=""
                    className="tracking-wide text-md text-justify font-arabic hyphens-auto text-gray-700"
                    delay={100}
                    duration={0.8}
                    ease="power3.out"
                    splitType="lines"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.3}
                    rootMargin="-100px"
                    textAlign="justify"
            />
            {/* <SplitText
                    text="
                    Each system is manufactured in a controlled factory environment 
                    and delivered ready for installation, reducing site complexity and ensuring consistent 
                    quality across every project.
                    "
                    custom=""
                    className="text-lg text-justify font-arabic text-gray-700"
                    delay={500}
                    duration={0.8}
                    ease="power3.out"
                    splitType="lines"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.3}
                    rootMargin="-100px"
                    textAlign="center"
            /> */}
                
        </div>
    );
};

export default Deliver;