export function middleware(req, ev) {
  const url = req.nextUrl.clone();
  if (url.searchParams.get("auth") === "false") {
    return new Response("Unauthorized");
  }
}
