import Elysia from 'elysia';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './controllers/user.controller';

const prisma = new PrismaService();
const app = new Elysia();

app.decorate('prisma', prisma);
app.get("/", () => "Hello Elysia");
app.get('/users', UserController.getUsers);
app.get('/users/:id', UserController.getUserById);
app.post('/users', UserController.createUser);
app.post('/users/:id/posts', UserController.createPost);

app.listen(process.env.PORT || 3001, () => console.log(`Server is running on http://localhost:${process.env.PORT || 3001}`));
