import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createClerkClient } from '@clerk/clerk-sdk-node';
import {
  AuthUser,
  UserRole,
  LoginResponse,
  RegisterResponse,
  AuthTokenPayload,
} from '@cinecircle/types';
import { LoginDto, RegisterDto, UpdateProfileDto } from './dto';

// Mock repository interface - in real implementation, this would be a database repository
interface AuthRepository {
  findByClerkId(clerkId: string): Promise<AuthUser | null>;
  findByEmail(email: string): Promise<AuthUser | null>;
  findByUsername(username: string): Promise<AuthUser | null>;
  findById(id: string): Promise<AuthUser | null>;
  create(userData: Partial<AuthUser>): Promise<AuthUser>;
  update(id: string, userData: Partial<AuthUser>): Promise<AuthUser>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class AuthService {
  private clerkClient: any;

  constructor(
    private readonly jwtService: JwtService,
    // @Inject('AUTH_REPOSITORY') private readonly repository: AuthRepository,
  ) {
    this.clerkClient = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY,
    });
  }

  async validateClerkToken(token: string): Promise<any> {
    try {
      const session = await this.clerkClient.sessions.verifySession(token);
      return session;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired session token');
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    // Validate session with Clerk
    const session = await this.validateClerkToken(loginDto.token);
    
    if (!session || session.status !== 'active') {
      throw new UnauthorizedException('Invalid session');
    }

    // For now, we'll use mock data since we don't have a real database
    // In real implementation, this would be: const user = await this.repository.findByClerkId(session.userId);
    const user = await this.getMockUser(session.userId);
    
    if (!user) {
      throw new UnauthorizedException('User not found. Please register first.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const accessToken = this.generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    // Verify user exists in Clerk
    try {
      const clerkUser = await this.clerkClient.users.getUser(registerDto.clerkId);
      
      // Validate email matches
      const emailMatch = clerkUser.emailAddresses.some(
        (email: any) => email.emailAddress === registerDto.email
      );
      
      if (!emailMatch) {
        throw new UnauthorizedException('Email does not match Clerk user');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid Clerk user');
    }

    // Check for existing users (mock implementation)
    // In real implementation:
    // const existingUser = await this.repository.findByClerkId(registerDto.clerkId);
    // const existingEmail = await this.repository.findByEmail(registerDto.email);
    // const existingUsername = await this.repository.findByUsername(registerDto.username);
    
    const existingUser = await this.getMockUser(registerDto.clerkId);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Mock check for email and username conflicts
    if (registerDto.email === 'existing@example.com') {
      throw new ConflictException('Email already in use');
    }
    
    if (registerDto.username === 'existinguser') {
      throw new ConflictException('Username already taken');
    }

    // Create new user (mock implementation)
    const newUser: AuthUser = {
      id: `user_${Date.now()}`,
      clerkId: registerDto.clerkId,
      email: registerDto.email,
      username: registerDto.username,
      displayName: registerDto.displayName || registerDto.username,
      avatarUrl: undefined,
      role: UserRole.USER,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In real implementation: const user = await this.repository.create(newUser);
    const user = newUser;

    const accessToken = this.generateAccessToken(user);

    return {
      user,
      accessToken,
    };
  }

  async getProfile(userId: string): Promise<AuthUser> {
    // In real implementation: const user = await this.repository.findById(userId);
    const user = await this.getMockUser(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, updateDto: UpdateProfileDto): Promise<AuthUser> {
    // In real implementation: const user = await this.repository.findById(userId);
    const user = await this.getMockUser(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // In real implementation: return await this.repository.update(userId, updateDto);
    const updatedUser: AuthUser = {
      ...user,
      ...updateDto,
      updatedAt: new Date().toISOString(),
    };

    return updatedUser;
  }

  generateAccessToken(user: AuthUser): string {
    const payload: Omit<AuthTokenPayload, 'iat' | 'exp'> = {
      sub: user.id,
      clerkId: user.clerkId,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(userId: string): Promise<AuthUser | null> {
    // In real implementation: const user = await this.repository.findById(userId);
    const user = await this.getMockUser(userId);
    
    if (!user || !user.isActive) {
      return null;
    }

    return user;
  }

  // Mock data helper - remove in real implementation
  private async getMockUser(identifier: string): Promise<AuthUser | null> {
    // Mock users for testing
    const mockUsers: AuthUser[] = [
      {
        id: 'user_123',
        clerkId: 'clerk_123',
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'Test User',
        avatarUrl: 'https://example.com/avatar.jpg',
        role: UserRole.USER,
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: 'user_456',
        clerkId: 'clerk_456',
        username: 'adminuser',
        email: 'admin@example.com',
        displayName: 'Admin User',
        avatarUrl: 'https://example.com/admin-avatar.jpg',
        role: UserRole.ADMIN,
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ];

    return mockUsers.find(user => 
      user.id === identifier || 
      user.clerkId === identifier || 
      user.email === identifier || 
      user.username === identifier
    ) || null;
  }
}