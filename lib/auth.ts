import { auth } from '@clerk/nextjs/server';

export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const { userId } = await auth();
    return !!userId; // Any signed-in user via Clerk is considered an admin because the Clerk project is strictly private.
  } catch {
    return false;
  }
}
