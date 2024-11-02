// import { Injectable } from '@nestjs/common';
// import axios from 'axios';
// import * as crypto from 'crypto';

// @Injectable()
// export class MomoService {
//   private partnerCode = 'MOMO_PARTNER_CODE';
//   private accessKey = 'MOMO_ACCESS_KEY';
//   private secretKey = 'MOMO_SECRET_KEY';
//   private requestType = 'captureWallet';
//   private endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';

//   async createPayment(orderId: string, amount: number) {
//     const requestId = `${orderId}-${Date.now()}`;
//     const orderInfo = `Thanh toán đơn hàng ${orderId}`;
//     const redirectUrl = 'http://localhost:3000/payment-result';
//     const ipnUrl = 'http://localhost:3000/api/momo/notify';
//     const extraData = ''; // Dữ liệu thêm nếu có

//     const rawSignature = `accessKey=${this.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${this.requestType}`;
//     const signature = crypto
//       .createHmac('sha256', this.secretKey)
//       .update(rawSignature)
//       .digest('hex');

//     const body = {
//       partnerCode: this.partnerCode,
//       accessKey: this.accessKey,
//       requestId: requestId,
//       amount: amount,
//       orderId: orderId,
//       orderInfo: orderInfo,
//       redirectUrl: redirectUrl,
//       ipnUrl: ipnUrl,
//       extraData: extraData,
//       requestType: this.requestType,
//       signature: signature,
//       lang: 'vi',
//     };

//     const { data } = await axios.post(this.endpoint, body);
//     return data;
//   }
// }
