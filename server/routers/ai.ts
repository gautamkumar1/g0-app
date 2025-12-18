import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { inngest } from '@/inngest/client';
import { prisma } from '@/utils/db';
export const aiRouter = router({
  coderAgent: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      // 1. Create message in PENDING state
      const message = await prisma.message.create({
        data: {
          content: input.text,
          role: "USER",
          messageType: "RESULT",
          status: "PENDING",
        },
      });

      try {
        // 2. Send event to Inngest
        console.log("Messagge is created", message);
        
        await inngest.send({
          name: "ai/coderAgent",
          data: {
            messageId: message.id,
            text: input.text,
          },
        });

        // 3. Mark as PROCESSING
        await prisma.message.update({
          where: { id: message.id },
          data: { status: "PROCESSING" },
        });

        return { messageId: message.id };

      }
      catch (error: any) {
        // 4. Mark as FAILED (no orphan!)
        await prisma.message.update({
          where: { id: message.id },
          data: {
            status: "FAILED",
          },
        });

        throw new Error("AI processing failed. Try again later.");
      }
    }),
});
export type AiRouter = typeof aiRouter;