import { Controller, Get } from "@nestjs/common";

import { UsersService } from "../users/users.service";

@Controller("webhooks")
export class WebhookDebugController {
  constructor(private readonly usersService: UsersService) {}

  @Get("debug")
  async getWebhookDebug() {
    const userCount = await this.usersService.getUserCount();
    const allUsers = await this.usersService.findAll();

    return {
      message: "Webhook debug info",
      userCount,
      users: allUsers,
      timestamp: new Date().toISOString(),
    };
  }
}
