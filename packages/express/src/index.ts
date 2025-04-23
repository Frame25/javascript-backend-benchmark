import express from 'express';
import { json } from 'body-parser';
import { PrismaService } from './prisma/prisma.service';
import userRoutes from './routes/user.routes';
import helloRoutes from './routes/hello.routes';

const app = express();
const prisma = new PrismaService();

app.use(json());
app.use('/users', userRoutes(prisma));
app.use('/', helloRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
