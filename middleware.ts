import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/u(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') || [];

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth()
  const email = sessionClaims?.email as string;

  if (isProtectedRoute(req)) await auth.protect();
  // Protect admin routes
  if (isAdminRoute(req)) {
    await auth.protect(); 

    if (!userId || !ADMIN_EMAILS.includes(email)) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/" },
      });
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
