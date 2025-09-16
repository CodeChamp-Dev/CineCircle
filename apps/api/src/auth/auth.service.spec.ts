import { UserRole, AuthUser } from "@cinecircle/types";
import { createClerkClient, ClerkClient } from "@clerk/clerk-sdk-node";
import { UnauthorizedException, ConflictException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto, UpdateProfileDto } from "./dto";

// Mock Clerk
jest.mock("@clerk/clerk-sdk-node", () => ({
  createClerkClient: jest.fn(() => ({
    sessions: {
      verifySession: jest.fn(),
    },
    users: {
      getUser: jest.fn(),
    },
  })),
}));

describe("AuthService", () => {
  let service: AuthService;
  let jwtService: JwtService;
  let mockClerkClient: ClerkClient;

  const mockUser = {
    id: "user_123",
    clerkId: "clerk_123",
    username: "testuser",
    email: "test@example.com",
    displayName: "Test User",
    avatarUrl: "https://example.com/avatar.jpg",
    role: UserRole.USER,
    isActive: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  };

  const mockClerkUser = {
    id: "clerk_123",
    emailAddresses: [{ emailAddress: "test@example.com" }],
    username: "testuser",
    firstName: "Test",
    lastName: "User",
    imageUrl: "https://example.com/avatar.jpg",
  };

  const mockRepository = {
    findByClerkId: jest.fn(),
    findByEmail: jest.fn(),
    findByUsername: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue("mock_jwt_token"),
            verify: jest.fn(),
          },
        },
        {
          provide: "AUTH_REPOSITORY",
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);

    // Setup Clerk client mock
    mockClerkClient = createClerkClient({ secretKey: "test-key" });

    // Mock the service's clerkClient property
    (service as unknown as { clerkClient: ClerkClient }).clerkClient = mockClerkClient;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("validateClerkToken", () => {
    it("should validate a valid Clerk session token", async () => {
      const sessionToken = "valid_session_token";
      mockClerkClient.sessions.verifySession.mockResolvedValue({
        status: "active",
        userId: "clerk_123",
      });

      const result = await service.validateClerkToken(sessionToken);

      expect(result).toEqual({
        status: "active",
        userId: "clerk_123",
      });
      expect(mockClerkClient.sessions.verifySession).toHaveBeenCalledWith(sessionToken);
    });

    it("should throw UnauthorizedException for invalid token", async () => {
      const sessionToken = "invalid_token";
      mockClerkClient.sessions.verifySession.mockRejectedValue(new Error("Invalid token"));

      await expect(service.validateClerkToken(sessionToken)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("login", () => {
    const loginDto: LoginDto = { token: "valid_session_token" };

    it("should login existing user successfully", async () => {
      mockClerkClient.sessions.verifySession.mockResolvedValue({
        status: "active",
        userId: "clerk_123",
      });
      // Mock the getMockUser method instead of repository
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(mockUser);

      const result = await service.login(loginDto);

      expect(result).toEqual({
        user: mockUser,
        accessToken: "mock_jwt_token",
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        clerkId: mockUser.clerkId,
        email: mockUser.email,
        username: mockUser.username,
        role: mockUser.role,
      });
    });

    it("should throw UnauthorizedException for non-existent user", async () => {
      mockClerkClient.sessions.verifySession.mockResolvedValue({
        status: "active",
        userId: "clerk_123",
      });
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });

    it("should throw UnauthorizedException for inactive user", async () => {
      const inactiveUser = { ...mockUser, isActive: false };
      mockClerkClient.sessions.verifySession.mockResolvedValue({
        status: "active",
        userId: "clerk_123",
      });
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(inactiveUser);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("register", () => {
    const registerDto: RegisterDto = {
      clerkId: "clerk_123",
      email: "test@example.com",
      username: "testuser",
      displayName: "Test User",
    };

    it("should register new user successfully", async () => {
      mockClerkClient.users.getUser.mockResolvedValue(mockClerkUser);
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(null);

      const result = await service.register(registerDto);

      expect(result.user.clerkId).toBe(registerDto.clerkId);
      expect(result.user.email).toBe(registerDto.email);
      expect(result.user.username).toBe(registerDto.username);
      expect(result.user.role).toBe(UserRole.USER);
      expect(result.accessToken).toBe("mock_jwt_token");
    });

    it("should throw ConflictException for existing user", async () => {
      mockClerkClient.users.getUser.mockResolvedValue(mockClerkUser);
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(mockUser);

      await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
    });

    it("should throw ConflictException for existing email", async () => {
      mockClerkUser.emailAddresses = [{ emailAddress: "existing@example.com" }];
      mockClerkClient.users.getUser.mockResolvedValue(mockClerkUser);
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(null);

      const conflictDto = { ...registerDto, email: "existing@example.com" };
      await expect(service.register(conflictDto)).rejects.toThrow(ConflictException);
    });

    it("should throw ConflictException for existing username", async () => {
      const customMockClerkUser = {
        ...mockClerkUser,
        emailAddresses: [{ emailAddress: "existinguser@example.com" }],
      };
      mockClerkClient.users.getUser.mockResolvedValue(customMockClerkUser);
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(null);

      const conflictDto = {
        ...registerDto,
        email: "existinguser@example.com",
        username: "existinguser",
      };
      await expect(service.register(conflictDto)).rejects.toThrow(ConflictException);
    });
  });

  describe("getProfile", () => {
    it("should return user profile", async () => {
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(mockUser);

      const result = await service.getProfile("user_123");

      expect(result).toEqual(mockUser);
    });

    it("should throw NotFoundException for non-existent user", async () => {
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(null);

      await expect(service.getProfile("non_existent")).rejects.toThrow(NotFoundException);
    });
  });

  describe("updateProfile", () => {
    const updateDto: UpdateProfileDto = {
      displayName: "Updated Name",
      avatarUrl: "https://example.com/new-avatar.jpg",
    };

    it("should update user profile successfully", async () => {
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(mockUser);

      const result = await service.updateProfile("user_123", updateDto);

      expect(result.displayName).toBe(updateDto.displayName);
      expect(result.avatarUrl).toBe(updateDto.avatarUrl);
      expect(result.id).toBe(mockUser.id);
    });

    it("should throw NotFoundException for non-existent user", async () => {
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(null);

      await expect(service.updateProfile("non_existent", updateDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe("generateAccessToken", () => {
    it("should generate access token with correct payload", () => {
      const token = service.generateAccessToken(mockUser);

      expect(token).toBe("mock_jwt_token");
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        clerkId: mockUser.clerkId,
        email: mockUser.email,
        username: mockUser.username,
        role: mockUser.role,
      });
    });
  });

  describe("validateUser", () => {
    it("should validate user by id", async () => {
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(mockUser);

      const result = await service.validateUser("user_123");

      expect(result).toEqual(mockUser);
    });

    it("should return null for non-existent user", async () => {
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(null);

      const result = await service.validateUser("non_existent");

      expect(result).toBeNull();
    });

    it("should return null for inactive user", async () => {
      const inactiveUser = { ...mockUser, isActive: false };
      jest
        .spyOn(
          service as unknown as { getMockUser: (id: string) => Promise<AuthUser | null> },
          "getMockUser",
        )
        .mockResolvedValue(inactiveUser);

      const result = await service.validateUser("user_123");

      expect(result).toBeNull();
    });
  });
});
