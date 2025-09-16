import { AuthUser, LoginResponse, RegisterResponse } from "@cinecircle/types";
import { Session } from "@clerk/clerk-sdk-node";
import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Request,
  UseGuards,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto, UpdateProfileDto, VerifyTokenDto } from "./dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";

interface RequestWithUser {
  user: AuthUser;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(loginDto);
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(ValidationPipe) registerDto: RegisterDto): Promise<RegisterResponse> {
    return await this.authService.register(registerDto);
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: RequestWithUser): Promise<AuthUser> {
    return await this.authService.getProfile(req.user.id);
  }

  @Put("profile")
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req: RequestWithUser,
    @Body(ValidationPipe) updateDto: UpdateProfileDto,
  ): Promise<AuthUser> {
    return await this.authService.updateProfile(req.user.id, updateDto);
  }

  @Post("validate-token")
  @HttpCode(HttpStatus.OK)
  async validateToken(@Body(ValidationPipe) { token }: VerifyTokenDto): Promise<{
    valid: boolean;
    session?: Session;
  }> {
    const session = await this.authService.validateClerkToken(token);
    return {
      valid: true,
      session,
    };
  }
}
