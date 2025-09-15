import { Module } from "@nestjs/common";

import { HealthModule } from "./health/health.module";
import { AuthModule } from "./auth/auth.module";
import { ExampleModule } from "./example/example.module";

@Module({
  imports: [HealthModule, AuthModule, ExampleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
