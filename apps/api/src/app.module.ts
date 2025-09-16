import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { ExampleModule } from "./example/example.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [HealthModule, AuthModule, ExampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
