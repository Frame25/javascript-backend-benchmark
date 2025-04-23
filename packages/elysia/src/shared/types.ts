import type { Context } from "elysia";
import type {PrismaService} from "../prisma/prisma.service";

export type AppContext<P = any, B = any> = Omit<Context, 'body' | 'params'> & {prisma: PrismaService; body: B; params: P}
