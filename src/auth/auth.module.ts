import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD, // authGuard 를 전역으로 적용되게함
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
