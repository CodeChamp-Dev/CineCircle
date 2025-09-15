/**
 * Authentication domain types and interfaces
 */

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
}

export interface AuthUser {
  id: string;
  clerkId: string;
  username: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokenPayload {
  sub: string; // user id
  clerkId: string;
  email: string;
  username: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface LoginRequest {
  token: string; // Clerk session token
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
}

export interface RegisterRequest {
  clerkId: string;
  email: string;
  username: string;
  displayName?: string;
}

export interface RegisterResponse {
  user: AuthUser;
  accessToken: string;
}

export interface UpdateProfileRequest {
  displayName?: string;
  avatarUrl?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface VerifyTokenRequest {
  token: string;
}