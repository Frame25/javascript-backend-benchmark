# node_backend_benchmarks

This repo is a benchmark test for comparison of backends made on different frameworks.

It made using [Oha](https://github.com/hatoo/oha) library.

## Process
1. Start all servers: 
   1. enter each folder: elysia, express, fastify, nestjs, nitro
   2. install dependencies
   3. check .env to have correct PORT and DATABASE_URL 
   4. run prebuild script (Nest, Nitro)
   5. run start script
2. Install dependencies in root folder
3. Check that running servers ports do match to variable in `benchmark.js`
4. Run `benchmark.js` at root folder


*This project was created using `bun init` in bun v1.1.8. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.*
