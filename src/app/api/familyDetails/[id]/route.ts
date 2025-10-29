import { NextResponse } from "next/server";
import familyDetails from "@/data/fontDetails.json";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    if (!id) {
      return NextResponse.json(
        { error: `No font id provided` },
        { status: 404 },
      );
    }

    return NextResponse.json(familyDetails, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch font details" },
      { status: 500 },
    );
  }
}
