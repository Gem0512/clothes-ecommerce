import { Controller, Post, Body } from '@nestjs/common';
import { MomoService } from './momo.service';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Post('create-payment')
  async createPayment(@Body() body) {
    const { amount, orderId, orderInfo } = body;
    return this.momoService.createPayment(amount, orderId, orderInfo);
  }

  // IPN callback từ MoMo
  @Post('ipn')
  handleIPN(@Body() body) {
    console.log('IPN data: ', body);
    // Xử lý logic nhận IPN từ MoMo để cập nhật trạng thái đơn hàng
    return { status: 'success' };
  }
}
