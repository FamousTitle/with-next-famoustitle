export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/profile-with-middleware"],
  // matcher: ["/((?!register|api|login).*)"],
}
