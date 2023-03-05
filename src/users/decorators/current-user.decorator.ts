import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

/**
 * Param decorator that gets `session.userId` from `ExecutionContext`
 */
export const CurrentUser = createParamDecorator(
  // What's `data`?
  // It's the parameter you passed to the decorator function when you used it
  // What's `ctx`? It's basically incoming request
  // But it's not specific to HTTP, it also handles WebSockets and gRPC
  // That's why it's called `ExecutionContext` instead of Request
  (data: never, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();
      return request.session.userId;
    }
  }
);