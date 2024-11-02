import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(
    orderId: string,
    amount: number,
    orderInfo: string,
  ): Promise<Order> {
    const newOrder = new this.orderModel({ orderId, amount, orderInfo });
    return newOrder.save(); // Lưu đơn hàng vào MongoDB
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  // Lấy đơn hàng theo orderId
  async getOrderById(orderId: string): Promise<Order> {
    return this.orderModel.findOne({ orderId }).exec();
  }
}
