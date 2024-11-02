import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class MomoService {
  constructor(private orderService: OrderService) {}
  private readonly partnerCode = 'MOMOSXVE20210914';
  private readonly accessKey = '3dXyXvboDh8gW43g';
  private readonly secretKey = 'QuxHFXdJ8KoufLVw1ToR9YIDHO0C6ZVY';
  private readonly requestType = 'captureWallet';
  private readonly endpoint =
    'https://test-payment.momo.vn/v2/gateway/api/create';

  async createPayment(amount: number, orderId: string, orderInfo: string) {
    const requestId = orderId;
    const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=&ipnUrl=https://7cb8-113-190-28-208.ngrok-free.app/momo/ipn&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=http://localhost:3000/payment-result&requestId=${requestId}&requestType=${this.requestType}`;

    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode: this.partnerCode,
      accessKey: this.accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl: 'http://localhost:3000/payment-result',
      ipnUrl: 'https://7cb8-113-190-28-208.ngrok-free.app/momo/ipn',
      requestType: this.requestType,
      extraData: '',
      signature,
    };

    try {
      const { data } = await axios.post(this.endpoint, requestBody);
      console.log(data);
      if (data && data.resultCode === 0) {
        await this.orderService.createOrder(orderId, amount, orderInfo);
      }
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
