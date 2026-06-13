"use client";

import CreateGalleryDialog from "@/features/Admin/Gallery/CreateGalleryDialog";
import GalleryList from "@/features/Admin/Gallery/Table/GalleryList";
import React from "react";

function Gallery() {
  return (
    <div>
      <h1 className="mb-10 text-4xl font-semibold">Gallery</h1>

      <div className="space-y-10">
        <div>
          <CreateGalleryDialog />
        </div>

        <GalleryList />
      </div>
    </div>
  );
}

export default Gallery;
