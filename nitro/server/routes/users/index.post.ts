import {prisma} from "~/utils/prisma.service";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email } = body;
  const user = await prisma.user.upsert({
    where: {email},
    create: {name, email},
    update: {name, email}
  });
  return user;
});
