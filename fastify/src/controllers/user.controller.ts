import { PrismaService } from '../prisma/prisma.service';
import { FastifyRequest, FastifyReply } from 'fastify';

interface Params {
  id: string;
}

interface CreateUserBody {
  name: string;
  email: string;
}

interface CreatePostBody {
  title: string;
  content: string;
}

export class UserController {
  constructor(private prisma: PrismaService) {}

  async getUsers(req: FastifyRequest, reply: FastifyReply) {
    const users = await this.prisma.user.findMany({
      include: { posts: true },
    });
    reply.send(users);
  }

  async getUserById(req: FastifyRequest<{ Params: Params }>, reply: FastifyReply) {
    const id = parseInt(req.params.id, 10);
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
    reply.send(user);
  }

  async createUser(req: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) {
    const { name, email } = req.body;
    const user = await this.prisma.user.upsert({
      where: {email},
      create: {name, email},
      update: {name, email}
    });
    reply.send(user);
  }

  async createPost(req: FastifyRequest<{ Params: Params; Body: CreatePostBody }>, reply: FastifyReply) {
    const userId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const post = await this.prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    reply.send(post);
  }
}
