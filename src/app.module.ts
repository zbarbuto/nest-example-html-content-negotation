import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { ContentInterceptor } from './content.interceptor';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ContentInterceptor,
    },
  ],
})
export class AppModule {}
