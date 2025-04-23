import { PrismaClient } from '../../../../prisma/prisma-generated';

export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }
}
