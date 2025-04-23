import { prisma } from '~/utils/prisma.service';

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id, 10);
  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });
  return user;
});
