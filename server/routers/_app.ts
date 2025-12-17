import { router } from '../trpc';
import { AiRouter, aiRouter } from './ai';
import { MessageRouter, messageRouter } from './message';

export const appRouter = router({
  ai: aiRouter as AiRouter,
  message: messageRouter as MessageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

