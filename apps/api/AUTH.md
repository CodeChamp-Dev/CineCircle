# Authentication API Documentation

This document describes the authentication endpoints and usage for the CineCircle API.

## Overview

The authentication system uses Clerk for user management and JWT tokens for session management. The system supports role-based access control with the following roles:

- `USER` - Regular users (default)
- `ADMIN` - Administrator users
- `MODERATOR` - Moderator users

## Environment Variables

```bash
# Required
CLERK_SECRET_KEY=your_clerk_secret_key
JWT_SECRET=your_jwt_secret_key

# Optional
JWT_EXPIRES_IN=24h  # Default: 24h
API_PORT=4000       # Default: 4000
```

## Endpoints

### POST /api/auth/login

Authenticate a user using a Clerk session token.

**Request Body:**
```json
{
  "token": "clerk_session_token"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "clerkId": "clerk_456",
    "username": "john_doe",
    "email": "john@example.com",
    "displayName": "John Doe",
    "avatarUrl": "https://example.com/avatar.jpg",
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "jwt_access_token"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired session token
- `401 Unauthorized`: User not found or inactive

### POST /api/auth/register

Register a new user after Clerk signup.

**Request Body:**
```json
{
  "clerkId": "clerk_user_id",
  "email": "user@example.com",
  "username": "unique_username",
  "displayName": "Display Name" // Optional
}
```

**Response:**
```json
{
  "user": {
    "id": "user_123",
    "clerkId": "clerk_456",
    "username": "unique_username",
    "email": "user@example.com",
    "displayName": "Display Name",
    "avatarUrl": null,
    "role": "user",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "accessToken": "jwt_access_token"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid Clerk user
- `409 Conflict`: User already exists
- `409 Conflict`: Email already in use
- `409 Conflict`: Username already taken

### GET /api/auth/profile

Get the current user's profile. Requires authentication.

**Headers:**
```
Authorization: Bearer <jwt_access_token>
```

**Response:**
```json
{
  "id": "user_123",
  "clerkId": "clerk_456",
  "username": "john_doe",
  "email": "john@example.com",
  "displayName": "John Doe",
  "avatarUrl": "https://example.com/avatar.jpg",
  "role": "user",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found

### PUT /api/auth/profile

Update the current user's profile. Requires authentication.

**Headers:**
```
Authorization: Bearer <jwt_access_token>
```

**Request Body:**
```json
{
  "displayName": "New Display Name", // Optional
  "avatarUrl": "https://example.com/new-avatar.jpg" // Optional
}
```

**Response:**
```json
{
  "id": "user_123",
  "clerkId": "clerk_456",
  "username": "john_doe",
  "email": "john@example.com",
  "displayName": "New Display Name",
  "avatarUrl": "https://example.com/new-avatar.jpg",
  "role": "user",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T12:30:45.000Z"
}
```

**Error Responses:**
- `401 Unauthorized`: Missing or invalid token
- `404 Not Found`: User not found

### POST /api/auth/validate-token

Validate a Clerk session token without logging in.

**Request Body:**
```json
{
  "token": "clerk_session_token"
}
```

**Response:**
```json
{
  "valid": true,
  "session": {
    "status": "active",
    "userId": "clerk_user_id"
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or expired token

## Role-Based Access Control

Use the `@Roles()` decorator and `RolesGuard` to protect endpoints:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { UserRole, AuthUser } from '@cinecircle/types';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  
  @Get('users')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  getUsers(@CurrentUser() user: AuthUser) {
    // Only admins and moderators can access this endpoint
    return { message: 'Admin endpoint accessed', user: user.username };
  }
}
```

## Authentication Flow

1. **User Registration/Login via Clerk**: Handle authentication on the frontend using Clerk
2. **Backend Registration**: Call `/api/auth/register` with Clerk user data
3. **Subsequent Logins**: Call `/api/auth/login` with Clerk session token
4. **Protected Requests**: Include JWT token in Authorization header
5. **Token Validation**: Token is automatically validated on protected routes

## Error Handling

All authentication endpoints return consistent error responses:

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

Common error scenarios:
- Invalid or expired Clerk session tokens
- Missing JWT tokens on protected routes
- Insufficient permissions for role-protected routes
- User not found or inactive accounts

## Security Considerations

- JWT tokens expire based on `JWT_EXPIRES_IN` environment variable
- All passwords are handled by Clerk, not stored locally
- Role changes require admin privileges
- Session tokens should be validated on each request
- HTTPS should be used in production

## Testing

Run authentication tests:

```bash
# Unit tests
pnpm test -- apps/api/src/auth

# Integration tests
pnpm test -- apps/api/src/auth/auth.integration.spec.ts
```

## Future Enhancements

- Refresh token support
- Multi-factor authentication
- Account suspension/activation
- Audit logging for authentication events
- Rate limiting for authentication endpoints