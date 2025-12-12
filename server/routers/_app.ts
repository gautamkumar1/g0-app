import { email, z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { inngest } from '@/inngest/client';
import { AiRouter, aiRouter } from './ai';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `Hello ${opts.input.text}`,
      };
    }),
  triggerHelloWorld: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
    const result = await inngest.send({
      name:"test/hello.world",
      data: {email:input.email}
    })
    return {
      message: "Event sent to inngest",
      eventId: result.ids[0],
    }
    }),
  // merge the ai router into the app router
  ai: aiRouter as AiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

