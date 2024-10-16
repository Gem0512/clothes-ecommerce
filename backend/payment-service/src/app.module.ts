import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MomoModule } from './momo/momo.module';

@Module({
  imports: [MomoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
