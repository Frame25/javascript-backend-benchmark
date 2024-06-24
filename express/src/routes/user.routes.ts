import { Router } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { UserController } from '../controllers/user.controller';

const userRoutes = (prisma: PrismaService) => {
  const router = Router();
  const userController = new UserController(prisma);

  router.get('/', (req, res) => userController.getUsers(req, res));
  router.get('/:id', (req, res) => userController.getUserById(req, res));
  router.post('/', (req, res) => userController.createUser(req, res));
  router.post('/:id/posts', (req, res) => userController.createPost(req, res));

  return router;
};

export default userRoutes;
