"use client";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"

export default function CustomImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  [key: string]: any;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${!loaded ? "opacity-0" : "opacity-100"}}`}
        onLoadingComplete={() => setLoaded(true)}
        unoptimized={true}
      />
      {!loaded && (
        <Skeleton className="w-[1000px] h-[300px]" />
      )}
    </div>
  );
}
