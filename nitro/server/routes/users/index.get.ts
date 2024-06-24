import { prisma } from '~/utils/prisma.service';

export default defineEventHandler(async () => {
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  return users;
});
