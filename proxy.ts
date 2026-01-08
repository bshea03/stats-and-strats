import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const url = request.nextUrl;

  // app.statsandstrats.com -> /app/*
  if (hostname.startsWith("app.")) {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // statsandstrats.com -> kl/
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
