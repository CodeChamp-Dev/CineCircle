import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter({ logger: true }));
  app.setGlobalPrefix("api");
  const port = Number(process.env.API_PORT) || 4000;
  await app.listen(port, "0.0.0.0");
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Bootstrap failure", err);
  process.exit(1);
});
