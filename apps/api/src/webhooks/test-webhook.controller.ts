import { Controller, Post, Body } from "@nestjs/common";

import { UsersService } from "../users/users.service";

interface TestWebhookBody {
  [key: string]: unknown;
}

@Controller("webhooks")
export class TestWebhookController {
  constructor(private readonly usersService: UsersService) {}

  @Post("test")
  async testWebhook(@Body() body: TestWebhookBody) {
    console.log("Test webhook received:", JSON.stringify(body, null, 2));

    // Simulate a user creation
    const testUser = await this.usersService.upsertByClerkId({
      clerkId: "test_user_123",
      name: "Test User",
      email: "test@example.com",
      avatarUrl: "https://example.com/avatar.jpg",
    });

    return {
      message: "Test webhook processed",
      user: testUser,
    };
  }
}
