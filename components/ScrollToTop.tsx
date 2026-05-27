"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

const ScrollToTop = ({ children }: React.ComponentProps<"div">) => {
  const pathname = usePathname();
  const prevPathname = useRef("");

  useEffect(() => {
    if (pathname !== prevPathname.current) window.scrollTo(0, 0);
    prevPathname.current = pathname;
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
