import { FontCard } from "@/app/_components/FontCard";

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

async function getFonts(): Promise<FontsResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/families?page=1`,
    {
      next: { revalidate: 0 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch fonts");
  }

  return response.json();
}

export default async function Home() {
  let fonts: FontFamily[] = [];
  let error: string | null = null;

  try {
    const data = await getFonts();
    fonts = data.families;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load fonts";
  }

  return (
    <div className="w-full">
      <main className="pt-[58px] pb-[251px]">
        {error && (
          <div className="rounded-lg bg-red-50 p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="flex justify-center">
          {fonts.length > 0 && (
            <div className="w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {fonts.map((font) => (
                <FontCard
                  key={font.idFont}
                  name={font.name}
                  foundry={font.foundry}
                  images={font.images}
                  price={font.price}
                  totalFonts={font.totalFonts}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer />
    </div>
  );
}
