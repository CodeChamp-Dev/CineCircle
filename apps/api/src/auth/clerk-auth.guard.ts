import { verifyToken } from "@clerk/backend";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader: string | undefined =
      req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader || typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Missing bearer token");
    }
    const token = authHeader.slice("Bearer ".length);

    try {
      const result = await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      });
      req.auth = result;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
