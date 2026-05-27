import React from "react";
import clsx from "clsx";
import Image from "@/components/Image";
import { GalleryRecord } from "@/lib/firebase/firestore/gallery";

interface GalleryListProps {
  className?: string;
  images: GalleryRecord[];
}

const GalleryList: React.FC<GalleryListProps> = ({ className, images }) => {
  return (
    <div className={clsx("h-auto columns-3 gap-4 space-y-4", className)}>
      {images.map((item, indx) => (
        <Image
          key={indx}
          src={item.image.secureUrl}
          alt={item.image.publicId}
          title={item.name}
          className="h-auto w-full rounded-md object-cover"
        />
      ))}
    </div>
  );
};

export default GalleryList;
