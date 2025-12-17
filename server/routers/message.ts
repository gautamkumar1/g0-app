import { prisma } from '@/utils/db';
import { router, publicProcedure, } from '../trpc';


// define the message router
export const messageRouter = router({
    getMessages: publicProcedure
    .query(async () => {
      return await prisma.message.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    }),
});
export type MessageRouter = typeof messageRouter;