import { prisma } from '@/utils/db';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createTRPCContext() {
  return {
    prisma,
    // Add other context properties here as needed
    // For example: session, user, etc.
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

