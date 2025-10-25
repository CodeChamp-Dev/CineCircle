import { Controller, Get, UseGuards } from "@nestjs/common";

import { ClerkAuthGuard } from "../auth/clerk-auth.guard";

import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get("count")
  async getUserCount() {
    return this.usersService.getUserCount();
  }
}
