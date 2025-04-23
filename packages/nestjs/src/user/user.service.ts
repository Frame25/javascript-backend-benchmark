import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: { posts: true },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  async createUser(name: string, email: string) {
    return this.prisma.user.upsert({
      where: {email},
      create: {name, email},
      update: {name, email}
    });
  }

  async addPost(userId: number, title: string, content: string) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(userId),
      },
    });
  }
}
