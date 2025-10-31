import type { Metadata } from "next";
import { FontCard } from "@/app/_components/FontCard";
import { Pagination } from "@/app/_components/Pagination";

interface FontFamily {
  idFont: number;
  name: string;
  foundry: {
    id: string;
    name: string;
    totalFamilies: number;
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
    amount: number;
    currency: string;
  } | null;
  totalFonts: number;
  url: string;
}

interface FontsResponse {
  families: FontFamily[];
  totalFamilies: number;
}

const ITEMS_PER_PAGE = 24;

async function getFonts(page: number): Promise<FontsResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/families?page=${page}`,
    {
      next: { revalidate: 0 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch fonts");
  }

  return response.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  let fonts: FontFamily[] = [];
  let totalFamilies = 0;
  let error: string | null = null;

  try {
    const data = await getFonts(currentPage);
    fonts = data.families;
    totalFamilies = data.totalFamilies;

    const totalPages = Math.ceil(totalFamilies / ITEMS_PER_PAGE);
    if (currentPage > totalPages || currentPage < 1) {
      error = "Page not found";
      fonts = [];
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load fonts";
  }

  const totalPages = Math.ceil(totalFamilies / ITEMS_PER_PAGE);

  return (
    <main className="pt-[58px] pb-[251px]">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 mb-8">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="flex justify-center">
        {fonts.length > 0 && (
          <div className="w-full grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fonts.map((font) => (
              <FontCard
                key={font.idFont}
                name={font.name}
                foundry={font.foundry}
                images={font.images}
                price={font.price}
                totalFonts={font.totalFonts}
                id={font.idFont}
              />
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && fonts.length > 0 && (
        <div className="mt-20">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </main>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  return {
    title: `Tech Test | Home - Page ${currentPage}`,
  };
}
