import { exec } from 'child_process';
import { faker } from '@faker-js/faker';
import { PrismaClient } from './prisma/prisma-generated';

const prisma = new PrismaClient();

const servers = {
  elysia: 'http://localhost:3001',
  express: 'http://localhost:3002',
  fastify: 'http://localhost:3003',
  nestjs: 'http://localhost:3004',
  nitro: 'http://localhost:3005'
};

const serverNames = {
  [servers.elysia]: 'Elysia (Bun)',
  [servers.express]: 'Express',
  [servers.fastify]: 'Fastify',
  [servers.nestjs]: 'NestJS',
  [servers.nitro]: 'Nitro',
}

const endpoints = [
  { method: 'GET', url: '/users' },
  { method: 'POST', url: '/users' }
];

let results: any[] = [];

function runBenchmark(server: string, endpoint: { method: string; url: string }) {
  return new Promise((resolve, reject) => {
    const url = `${server}${endpoint.url}`;
    let command;

    if (endpoint.method === 'POST') {
      command = `oha -c 100 -n 1000 -m ${endpoint.method} -H "Content-Type: application/json" -d '${generateUniqueData()}' ${url} -j`;
    } else {
      command = `oha -c 100 -n 1000 -m ${endpoint.method} ${url} -j`;
    }

    exec(command, (error: any, stdout: any, stderr: any) => {
      if (error) {
        return reject(stderr);
      }

      const report = JSON.parse(stdout);
      resolve({ server: serverNames[server], endpoint: `${endpoint.method} ${endpoint.url}`, ...report });
    });
  });
}

function generateUniqueData() {
  const data = {
    name: faker.person.fullName(),
    email: faker.internet.email()
  };
  return JSON.stringify(data);
}

async function testServers() {
  for (const [name, url] of Object.entries(servers)) {
    for (const endpoint of endpoints) {
      try {
        const result = await runBenchmark(url, endpoint);
        results.push(result);
        console.log(`${name} server at ${endpoint.method} ${endpoint.url} - done`);
        await prisma.user.deleteMany();
      } catch (err) {
        console.error(`Error testing ${name} server at ${endpoint.method} ${endpoint.url}:`, err);
      }
    }
  }

  await Bun.write('./.output/report.json', JSON.stringify(results, null, 2))
}

testServers().catch(console.error);
