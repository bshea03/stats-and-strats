import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { srcClient } from "../../util/src-client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categories = await srcClient.games.getCategories(id);
  return NextResponse.json(categories, { status: 200 });
}
