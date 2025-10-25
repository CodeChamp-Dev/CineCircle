import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface ClerkAuth {
  sub: string;
  sid?: string;
  org_id?: string | null;
  [key: string]: unknown;
}

export const Auth = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.auth as ClerkAuth | undefined;
});
