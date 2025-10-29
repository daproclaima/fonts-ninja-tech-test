import type { Metadata } from "next";
import { FontDetails } from "../_components/FontDetails";

interface FontDetailsResponse {
  idFont: number;
  url: string;
  price?: {
    formatedPrice: string;
    amount: number;
    currency: string;
  } | null;
  idFamily: string;
  name: string;
  totalFonts: number;
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
    pangram: {
      svg: string;
      width: number;
      height: number;
    };
  };
}

async function getFontDetails(id: string): Promise<FontDetailsResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/familyDetails/${id}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch font details");
  }

  return response.json();
}

export default async function Id({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let fontDetails: FontDetailsResponse | null = null;
  let error: string | null = null;

  try {
    fontDetails = await getFontDetails(id);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load font details";
  }

  if (error || !fontDetails) {
    return (
      <div className="w-full pt-[58px] pb-[251px]">
        <main className="flex items-center justify-center min-h-[400px]">
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-red-800">{error || "Font not found"}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-full">
      <main className="pt-[58px] pb-[251px] mx-auto">
        <FontDetails
          name={fontDetails.name}
          foundry={fontDetails.foundry}
          images={fontDetails.images}
        />
      </main>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const fontDetails = await getFontDetails(id);
    return {
      title: `${fontDetails.name} | Tech Test`,
      description: `Explore ${fontDetails.name} font family with ${fontDetails.totalFonts} styles from ${fontDetails.foundry.name}`,
    };
  } catch {
    return {
      title: "Font Not Found | Tech Test",
    };
  }
}
