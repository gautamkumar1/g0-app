import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { inngest } from '@/inngest/client';

export const aiRouter = router({
  coderAgent: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const result = await inngest.send({
        name: "ai/coderAgent",
        data: { text: input.text },
      });
      return { result };
    }),
});
export type AiRouter = typeof aiRouter;