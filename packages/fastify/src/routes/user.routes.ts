import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from '../controllers/user.controller';

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

const userRoutes = (prisma: PrismaService) => async (app: FastifyInstance) => {
  const userController = new UserController(prisma);

  app.get('/', async (req: FastifyRequest, reply: FastifyReply) => {
    return userController.getUsers(req, reply);
  });

  app.get('/:id', async (req: FastifyRequest<{ Params: Params }>, reply: FastifyReply) => {
    return userController.getUserById(req, reply);
  });

  app.post('/', async (req: FastifyRequest<{ Body: CreateUserBody }>, reply: FastifyReply) => {
    return userController.createUser(req, reply);
  });

  app.post('/:id/posts', async (req: FastifyRequest<{ Params: Params; Body: CreatePostBody }>, reply: FastifyReply) => {
    return userController.createPost(req, reply);
  });
};

export default userRoutes;
