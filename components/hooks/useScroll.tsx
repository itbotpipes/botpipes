import { useEffect, useRef, useState } from "react";

const useScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  const prevScrollY = useRef(0);
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    setIsDown(prevScrollY.current < scrollY);
    prevScrollY.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, isDown };
};

export default useScroll;
