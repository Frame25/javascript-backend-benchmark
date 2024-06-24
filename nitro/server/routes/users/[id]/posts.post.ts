import {prisma} from "~/utils/prisma.service";

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id, 10);
  const body = await readBody(event);
  const { title, content } = body;
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: id,
    },
  });
  return post;
});
