import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRole } from '@cinecircle/types';
import { LoginDto, RegisterDto, UpdateProfileDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockUser = {
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
  };

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    validateClerkToken: jest.fn(),
    generateAccessToken: jest.fn(),
    validateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const loginDto: LoginDto = { token: 'valid_session_token' };

    it('should login user successfully', async () => {
      const expectedResponse = {
        user: mockUser,
        accessToken: 'mock_jwt_token',
      };
      mockAuthService.login.mockResolvedValue(expectedResponse);

      const result = await controller.login(loginDto);

      expect(result).toEqual(expectedResponse);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });

    it('should handle login errors', async () => {
      const error = new Error('Login failed');
      mockAuthService.login.mockRejectedValue(error);

      await expect(controller.login(loginDto)).rejects.toThrow('Login failed');
    });
  });

  describe('register', () => {
    const registerDto: RegisterDto = {
      clerkId: 'clerk_123',
      email: 'test@example.com',
      username: 'testuser',
      displayName: 'Test User',
    };

    it('should register user successfully', async () => {
      const expectedResponse = {
        user: mockUser,
        accessToken: 'mock_jwt_token',
      };
      mockAuthService.register.mockResolvedValue(expectedResponse);

      const result = await controller.register(registerDto);

      expect(result).toEqual(expectedResponse);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should handle registration errors', async () => {
      const error = new Error('Registration failed');
      mockAuthService.register.mockRejectedValue(error);

      await expect(controller.register(registerDto)).rejects.toThrow('Registration failed');
    });
  });

  describe('getProfile', () => {
    const mockRequest = {
      user: mockUser,
    };

    it('should return user profile', async () => {
      mockAuthService.getProfile.mockResolvedValue(mockUser);

      const result = await controller.getProfile(mockRequest);

      expect(result).toEqual(mockUser);
      expect(authService.getProfile).toHaveBeenCalledWith(mockUser.id);
    });

    it('should handle profile retrieval errors', async () => {
      const error = new Error('Profile not found');
      mockAuthService.getProfile.mockRejectedValue(error);

      await expect(controller.getProfile(mockRequest)).rejects.toThrow('Profile not found');
    });
  });

  describe('updateProfile', () => {
    const mockRequest = {
      user: mockUser,
    };
    const updateDto: UpdateProfileDto = {
      displayName: 'Updated Name',
      avatarUrl: 'https://example.com/new-avatar.jpg',
    };

    it('should update user profile successfully', async () => {
      const updatedUser = { ...mockUser, ...updateDto };
      mockAuthService.updateProfile.mockResolvedValue(updatedUser);

      const result = await controller.updateProfile(mockRequest, updateDto);

      expect(result).toEqual(updatedUser);
      expect(authService.updateProfile).toHaveBeenCalledWith(mockUser.id, updateDto);
    });

    it('should handle profile update errors', async () => {
      const error = new Error('Update failed');
      mockAuthService.updateProfile.mockRejectedValue(error);

      await expect(controller.updateProfile(mockRequest, updateDto)).rejects.toThrow('Update failed');
    });
  });

  describe('validateToken', () => {
    it('should validate token successfully', async () => {
      const tokenValidation = {
        status: 'active',
        userId: 'clerk_123',
      };
      mockAuthService.validateClerkToken.mockResolvedValue(tokenValidation);

      const result = await controller.validateToken({ token: 'valid_token' });

      expect(result).toEqual({
        valid: true,
        session: tokenValidation,
      });
      expect(authService.validateClerkToken).toHaveBeenCalledWith('valid_token');
    });

    it('should handle token validation errors', async () => {
      const error = new Error('Invalid token');
      mockAuthService.validateClerkToken.mockRejectedValue(error);

      await expect(controller.validateToken({ token: 'invalid_token' })).rejects.toThrow('Invalid token');
    });
  });
});