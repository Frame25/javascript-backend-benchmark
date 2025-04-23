import {AppContext} from "../shared/types";

export class UserController {
  static async getUsers({prisma}: AppContext) {
    return prisma.user.findMany({
      include: { posts: true },
    });
  }

  static async getUserById({prisma, params}: AppContext) {
    const id = parseInt(params.id, 10);

    return prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  static async createUser({prisma, body}: AppContext) {
    const { name, email } = body;

    return prisma.user.upsert({
      where: {email},
      create: {name, email},
      update: {name, email}
    });
  }

  static async createPost({prisma, params, body}: AppContext) {
    const userId = parseInt(params.id, 10);
    const { title, content } = body;

    return prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
  }
}
