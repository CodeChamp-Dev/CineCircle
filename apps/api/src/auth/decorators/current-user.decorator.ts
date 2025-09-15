import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '@cinecircle/types';

export const CurrentUser = createParamDecorator(
  (data: keyof AuthUser | undefined, ctx: ExecutionContext): AuthUser | any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);