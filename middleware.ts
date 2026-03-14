import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Protect admin dashboard and internal admin routes, but leave the login page (/admin) unprotected to allow sign-in
const isProtectedRoute = createRouteMatcher([
  "/admin/dashboard(.*)", 
  "/admin/programas(.*)", 
  "/admin/categorias(.*)", 
  "/admin/youtube(.*)", 
  "/api/admin(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
      await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
