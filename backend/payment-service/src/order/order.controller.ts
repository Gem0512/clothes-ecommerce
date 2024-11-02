import { Controller, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.schema';

@Controller('orders') // Định nghĩa route gốc là /orders
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Route để lấy tất cả các đơn hàng
  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  // Route để lấy đơn hàng theo orderId
  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string): Promise<Order> {
    return this.orderService.getOrderById(orderId);
  }
}
