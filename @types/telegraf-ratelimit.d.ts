declare module 'telegraf-ratelimit' {
  import { MiddlewareFn } from 'telegraf';

  interface RateLimitOptions {
    window: number;
    limit: number;
    keyGenerator?: (ctx: any) => any;
    onLimitExceeded?: MiddlewareFn<any>;
  }

  function rateLimit(options: RateLimitOptions): MiddlewareFn<any>;

  export = rateLimit as any;
}
