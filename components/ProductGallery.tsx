"use client";

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100">
        <Image
          src={activeImage}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`relative aspect-square overflow-hidden rounded-2xl border transition ${
              activeImage === image ? "border-ml-blue ring-2 ring-ml-blue/20" : "border-slate-200"
            }`}
          >
            <Image src={image} alt={title} fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
