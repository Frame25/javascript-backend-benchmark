import Fastify from 'fastify';
import { PrismaService } from './prisma/prisma.service';
import userRoutes from './routes/user.routes';
import helloRoutes from './routes/hello.routes';

const prisma = new PrismaService();
const app = Fastify();

app.register(userRoutes(prisma), { prefix: '/users' });
app.register(helloRoutes, { prefix: '/' });

const PORT = process.env.PORT || 3000;

app.listen({ port: Number(PORT) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
