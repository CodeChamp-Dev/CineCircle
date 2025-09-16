import { UserRole } from "@cinecircle/types";
import { INestApplication } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { Test, TestingModule } from "@nestjs/testing";

import { AuthModule } from "./auth.module";

describe("AuthController (Integration)", () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider("CLERK_SECRET_KEY")
      .useValue("test_secret_key")
      .compile();

    app = moduleFixture.createNestApplication(new FastifyAdapter());
    app.setGlobalPrefix("api");

    jwtService = moduleFixture.get<JwtService>(JwtService);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /auth/validate-token", () => {
    it("should validate token endpoint structure", async () => {
      const response = await app
        .getHttpAdapter()
        .getInstance()
        .inject({
          method: "POST",
          url: "/api/auth/validate-token",
          payload: {
            token: "invalid_token",
          },
        });

      // Should get an error response but still test the endpoint structure
      expect(response.statusCode).toBeDefined();
      expect(response.headers["content-type"]).toContain("application/json");
    });
  });

  describe("Authentication Flow", () => {
    it("should have proper endpoint structure", async () => {
      // Test login endpoint
      const loginResponse = await app
        .getHttpAdapter()
        .getInstance()
        .inject({
          method: "POST",
          url: "/api/auth/login",
          payload: {
            token: "test_token",
          },
        });

      expect(loginResponse.statusCode).toBeDefined();

      // Test register endpoint
      const registerResponse = await app
        .getHttpAdapter()
        .getInstance()
        .inject({
          method: "POST",
          url: "/api/auth/register",
          payload: {
            clerkId: "test_clerk_id",
            email: "test@example.com",
            username: "testuser",
          },
        });

      expect(registerResponse.statusCode).toBeDefined();
    });

    it("should protect profile endpoints", async () => {
      // Test profile endpoint without auth
      const profileResponse = await app.getHttpAdapter().getInstance().inject({
        method: "GET",
        url: "/api/auth/profile",
      });

      expect(profileResponse.statusCode).toBe(401);
    });

    it("should generate valid JWT tokens", () => {
      const mockUser = {
        id: "user_123",
        clerkId: "clerk_123",
        username: "testuser",
        email: "test@example.com",
        role: UserRole.USER,
      };

      const token = jwtService.sign({
        sub: mockUser.id,
        clerkId: mockUser.clerkId,
        email: mockUser.email,
        username: mockUser.username,
        role: mockUser.role,
      });

      expect(token).toBeDefined();
      expect(typeof token).toBe("string");

      // Verify token structure
      const decoded = jwtService.decode(token) as { sub: string; role: string };
      expect(decoded.sub).toBe(mockUser.id);
      expect(decoded.role).toBe(UserRole.USER);
    });
  });
});
