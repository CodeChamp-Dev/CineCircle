import { Controller, Post, Body } from "@nestjs/common";

import { UsersService } from "./users.service";

@Controller("users")
export class ManualSyncController {
  constructor(private readonly usersService: UsersService) {}

  @Post("sync")
  async syncUser(
    @Body() userData: { clerkId: string; name: string; email: string; avatarUrl?: string },
  ) {
    const user = await this.usersService.upsertByClerkId(userData);
    return {
      message: "User synced successfully",
      user,
    };
  }
}
