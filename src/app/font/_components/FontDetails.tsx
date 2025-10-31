"use client";

import { useState } from "react";

export interface FontDetailsImage {
  svg: string;
  width: number;
  height: number;
}

export interface FontDetailsProps {
  name: string;
  foundry: {
    id: string;
    name: string;
  };
  images: {
    alphabet: FontDetailsImage;
    pangram: FontDetailsImage;
  };
}

type ImageType = "pangram" | "alphabet";

export const FontDetails = ({ name, foundry, images }: FontDetailsProps) => {
  const [activeImage, setActiveImage] = useState<ImageType>("pangram");

  const currentImage = images[activeImage];

  return (
    <div className="flex flex-col md:flex-row w-full gap-2">
      <div className="w-full md:w-2/3 md:h-[700px] pt-10 pr-1.5 pl-12 pb-[37px] flex flex-col justify-between rounded-4xl bg-white dark:bg-dark-gray">
        <div className="w-full h-[450px] flex items-center justify-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-start overflow-hidden">
            <div
              // biome-ignore lint/security/noDangerouslySetInnerHtml: images are SVG strings from our server
              dangerouslySetInnerHTML={{ __html: currentImage.svg }}
              style={{
                aspectRatio: `${currentImage.width} / ${currentImage.height}`,
              }}
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveImage("pangram")}
            className={`px-6 py-3 font-medium transition-all ${
              activeImage === "pangram"
                ? "text-coral"
                : "text-neutral-900 dark:text-gray-25"
            }`}
          >
            Pangram
          </button>
          <button
            type="button"
            onClick={() => setActiveImage("alphabet")}
            className={`px-6 py-3 rounded-2xl font-medium transition-all ${
              activeImage === "alphabet"
                ? "text-coral"
                : "text-neutral-900 dark:text-gray-25"
            }`}
          >
            Alphabet
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/3 md:h-[700px] py-10 px-12 flex flex-col gap-6 rounded-4xl bg-white dark:bg-dark-gray">
        <div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-gray-25 mb-2">
            {name}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-gray-10">
            {foundry.name}
          </p>
        </div>
      </div>
    </div>
  );
};
