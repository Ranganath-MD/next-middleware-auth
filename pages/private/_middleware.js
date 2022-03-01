import { NextResponse, NextRequest } from "next/server";

export function middleware(req, ev) {
  const url = req.nextUrl.clone();
  if (!req.cookies.token) {
    url.pathname = "/";
    return NextResponse.redirect(url, 302);
  }
}
