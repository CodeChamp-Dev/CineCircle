import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";

import { ExampleController } from "./example.controller";

@Module({
  imports: [AuthModule],
  controllers: [ExampleController],
})
export class ExampleModule {}
