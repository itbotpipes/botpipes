import Hero from "@/components/Hero";
import React from "react";
import DownloadPage from "@/features/Download/download";



// TODO: Build download page
function Download() {
  return (
    <div>
      <Hero src={"/imgs/pipe.png"} text={"Downloads"} custom="md:text-7xl text-4xl" />
      <DownloadPage className="mx-auto"/>
    </div>
  );
}

export default Download;
