"use client";

export interface FontCardProps {
  name: string;
  foundry: {
    id: string;
    name: string;
  };
  images: {
    alphabet: {
      svg: string;
      width: number;
      height: number;
    };
  };
  price?: {
    formatedPrice: string;
  } | null;
  totalFonts: number;
}

export const FontCard = ({
  name,
  foundry,
  images,
  price,
  totalFonts,
}: FontCardProps) => {
  return (
    <div className="w-[437px] h-[314px] flex flex-col pt-12 pr-[42px] pb-12 pl-14 gap-[33px] overflow-hidden rounded-4xl bg-white dark:bg-dark-gray">
      <div className="max-w-[334px] max-h-[153px] flex items-center justify-start overflow-hidden aspect-video">
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: images.alphabet.svg is an html tag and comes from our server
          dangerouslySetInnerHTML={{ __html: images.alphabet.svg }}
          className="scale-[65%] origin-left"
        />
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-sm text-neutral-900 dark:text-gray-10 line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-neutral-600 dark:text-gray-10 line-clamp-1">
            {foundry.name}
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-0.5 pt-2">
          {price && (
            <span className="text-xs text-neutral-600 dark:text-gray-10 line-clamp-1">
              From {price.formatedPrice}
            </span>
          )}
          <span className="text-xs text-neutral-600 dark:text-gray-10 line-clamp-1">
            {totalFonts} styles
          </span>
        </div>
      </div>
    </div>
  );
};
