import { Module } from '@nestjs/common';
import { FeaturedContentModule } from '../featured-content/featured-content.module';

@Module({
  imports: [FeaturedContentModule],
})
export class ApiGatewayModule {}
