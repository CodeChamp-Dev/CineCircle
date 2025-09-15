import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole, AuthUser } from '@cinecircle/types';

@Controller('example')
export class ExampleController {
  
  @Get('public')
  getPublicData() {
    return {
      message: 'This is a public endpoint - no authentication required',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  getProtectedData(@CurrentUser() user: AuthUser) {
    return {
      message: 'This is a protected endpoint - authentication required',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      timestamp: new Date().toISOString(),
    };
  }

  @Get('admin-only')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAdminData(@CurrentUser() user: AuthUser) {
    return {
      message: 'This is an admin-only endpoint',
      adminUser: user.username,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('moderator-or-admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  getModeratorData(@CurrentUser() user: AuthUser) {
    return {
      message: 'This endpoint is for moderators and admins',
      user: {
        username: user.username,
        role: user.role,
      },
      timestamp: new Date().toISOString(),
    };
  }
}