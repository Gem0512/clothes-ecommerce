import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MomoModule } from './momo/momo.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/order'),
    OrderModule,
    MomoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
