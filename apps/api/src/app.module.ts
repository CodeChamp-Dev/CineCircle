import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DatabaseModule } from "./database.module";
import { HealthModule } from "./health/health.module";
import { ManualSyncController } from "./users/manual-sync.controller";
import { UsersController } from "./users/users.controller";
import { UsersModule } from "./users/users.module";
import { ClerkWebhookController } from "./webhooks/clerk.webhook.controller";
import { TestWebhookController } from "./webhooks/test-webhook.controller";
import { WebhookDebugController } from "./webhooks/webhook-debug.controller";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HealthModule, DatabaseModule, UsersModule],
  controllers: [
    ClerkWebhookController,
    WebhookDebugController,
    TestWebhookController,
    UsersController,
    ManualSyncController,
  ],
  providers: [],
})
export class AppModule {}
