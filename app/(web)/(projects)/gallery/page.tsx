import Hero from "@/components/Hero";
import GalleryList from "@/features/Gallery/GalleryList";
import { getGalleries } from "@/lib/firebase/firestore/gallery";
import React from "react";

export const revalidate = 60;

async function Gallery() {
  const images = await getGalleries();

  return (
    <div>
      <Hero src={"/imgs/gallery-banner.webp"} text={"Gallery"} custom="md:text-7xl text-4xl" />
      <GalleryList
        className="mx-auto max-w-[75rem] px-4 py-20"
        images={images}
      />
    </div>
  );
}

export default Gallery;
