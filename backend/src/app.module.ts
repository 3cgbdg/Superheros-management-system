import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeroModule } from './hero/hero.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HeroModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})


// configuring middleware logging 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
