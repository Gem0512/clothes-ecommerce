import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MomoService {
  private readonly partnerCode = 'MOMOSXVE20210914';
  private readonly accessKey = '3dXyXvboDh8gW43g';
  private readonly secretKey = 'QuxHFXdJ8KoufLVw1ToR9YIDHO0C6ZVY';
  private readonly requestType = 'captureWallet';
  private readonly endpoint =
    'https://test-payment.momo.vn/v2/gateway/api/create';

  async createPayment(amount: number, orderId: string, orderInfo: string) {
    const requestId = orderId;
    const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=&ipnUrl=https://localhost:3003/momo/ipn&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=https://localhost:3000/payment-result&requestId=${requestId}&requestType=${this.requestType}`;

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
      redirectUrl: 'https://localhost:3000/payment-result',
      ipnUrl: 'https://localhost:3001/momo/ipn',
      requestType: this.requestType,
      extraData: '',
      signature,
    };

    try {
      const { data } = await axios.post(this.endpoint, requestBody);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
