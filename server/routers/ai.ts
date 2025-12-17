import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { inngest } from '@/inngest/client';
import { prisma } from '@/utils/db';
export const aiRouter = router({
  coderAgent: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      // Create message in PENDING state
      await prisma.message.create({
        data:{
          content: input.text,
          role: "USER",
          messageType: "RESULT",
        }
      })
      // send the message to the coder agent
      const result = await inngest.send({
        name: "ai/coderAgent",
        data: { text: input.text },
      });
      return { result };
    }),
});
export type AiRouter = typeof aiRouter;