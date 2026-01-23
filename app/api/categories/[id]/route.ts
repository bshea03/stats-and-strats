import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { srcClient } from "../../util/src-client";

interface GetCategoriesParams {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const categories = await srcClient.games.getCategories(id);
  return NextResponse.json(categories, { status: 200 });
}
