import { PrismaService } from '../prisma/prisma.service';
import { Request, Response } from 'express';

export class UserController {
  constructor(private prisma: PrismaService) {}

  async getUsers(req: Request, res: Response) {
    const users = await this.prisma.user.findMany({
      include: { posts: true },
    });
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    const { name, email } = req.body;
    const user = await this.prisma.user.upsert({
      where: {email},
      create: {name, email},
      update: {name, email}
    });
    res.json(user);
  }

  async createPost(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const { title, content } = req.body;
    const post = await this.prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    res.json(post);
  }
}
