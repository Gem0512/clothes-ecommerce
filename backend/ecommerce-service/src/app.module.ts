import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-ecommerce'), // Kết nối MongoDB
    ECommerceModule,
    AuthModule,
  ],
})
export class AppModule {}
