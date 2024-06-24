import { FastifyInstance } from 'fastify';

const helloRoutes = async (app: FastifyInstance) => {
  app.get('/', async (req, reply) => {
    reply.send('Hello World!');
  });
};

export default helloRoutes;
