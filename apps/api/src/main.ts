import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import rawBody from "fastify-raw-body";

import { AppModule } from "./app.module";

async function bootstrap() {
  const adapter = new FastifyAdapter({ logger: true });
  // register raw body for webhook signature verification
  await adapter
    .getInstance()
    .register(rawBody, { global: false, field: "rawBody", runFirst: true });
  const app = await NestFactory.create(AppModule, adapter);
  app.setGlobalPrefix("api");
  const port = Number(process.env.API_PORT) || 4000;
  await app.listen(port, "0.0.0.0");
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Bootstrap failure", err);
  process.exit(1);
});
