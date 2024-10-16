import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Get,
  // UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { RolesGuard } from 'src/common/roles.guard';
// import { Roles } from 'src/common/role.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  async addToCart(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
    @Body('size') size: string,
    @Body('color') color: string,
    @Body('image') image: string,
    @Body('price') price: number,
  ) {
    return this.cartService.addToCart(
      userId,
      productId,
      quantity,
      size,
      color,
      image,
      price,
    );
  }

  @Patch('update')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  async updateCartItem(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
    @Body('quantity') quantity: number,
    @Body('quantity') size: string,
    @Body('quantity') color: string,
  ) {
    return this.cartService.updateCartItems(
      userId,
      productId,
      quantity,
      size,
      color,
    );
  }

  @Delete('remove/:userId/:productId')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  async removeFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }
}
