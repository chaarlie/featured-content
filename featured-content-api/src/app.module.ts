import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturedContentModule } from './featured-content/featured-content.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), FeaturedContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
