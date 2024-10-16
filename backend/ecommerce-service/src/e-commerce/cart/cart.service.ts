import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema'; // Import model giỏ hàng
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private readonly productService: ProductService,
  ) {}

  async addToCart(
    userId: string,
    productId: string,
    quantity: number,
    size: string,
    color: string,
    image: string,
    price: number,
  ) {
    let cart = await this.cartModel.findOne({ userId });
    const sizeObject = JSON.parse(size);
    const colorObject = JSON.parse(color);

    console.log(productId, quantity, sizeObject, colorObject, image, price);
    if (!cart) {
      cart = new this.cartModel({
        userId,
        items: [{ productId, quantity, sizeObject, colorObject, image, price }],
        totalPrice: 0,
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId,
          quantity,
          size: sizeObject,
          color: colorObject,
          image,
          price,
        });
      }
    }

    cart.totalPrice = await this.calculateTotalPrice(cart.items);
    return await cart.save();
  }

  async updateCartItems(
    userId: string,
    productId: string,
    quantity: number,
    size: string,
    color: string,
  ) {
    const cart = await this.cartModel.findOne({ userId });

    if (!cart) throw new NotFoundException('Cart not found');

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].size = JSON.parse(size);
      cart.items[itemIndex].color = JSON.parse(color);
    } else {
      throw new NotFoundException('Product not found in cart');
    }

    cart.totalPrice = await this.calculateTotalPrice(cart.items);
    return await cart.save();
  }
  async removeFromCart(userId: string, productId: string) {
    // Tìm giỏ hàng của người dùng
    const cart = await this.cartModel.findOne({ userId }).exec();

    // Kiểm tra xem giỏ hàng có tồn tại không
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    console.log('Cart found:', cart);

    // Lưu số lượng sản phẩm trước khi xóa
    const previousItemsCount = cart.items.length;

    // Lọc các sản phẩm để loại bỏ sản phẩm cần xóa
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString(),
    );

    // Kiểm tra số lượng sản phẩm sau khi xóa
    const newItemsCount = cart.items.length;
    console.log(
      `Removed productId: ${productId}. Items count changed from ${previousItemsCount} to ${newItemsCount}`,
    );

    // Cập nhật tổng giá của giỏ hàng
    cart.totalPrice = await this.calculateTotalPrice(cart.items);

    console.log('New total price:', cart.totalPrice);

    // Lưu giỏ hàng đã cập nhật
    try {
      return await cart.save();
    } catch (error) {
      console.error('Error saving cart:', error);
      throw new InternalServerErrorException('Error saving cart');
    }
  }

  async calculateTotalPrice(
    items: { productId: string; quantity: number; price: number }[],
  ): Promise<number> {
    let totalPrice = 0;

    // Giả sử bạn đã có ProductService để lấy thông tin sản phẩm (như giá)
    for (const item of items) {
      const product = await this.productService.findById(item.productId);
      console.log(item);
      totalPrice += product.price * item.quantity;
    }

    return totalPrice;
  }

  async getCart(userId: string) {
    return await this.cartModel.findOne({ userId }).populate('items.productId');
  }

  // Giả sử có ProductService để lấy thông tin sản phẩm
  async getProductById(productId: string) {
    // Gọi tới ProductService để lấy thông tin sản phẩm
    return await this.productService.findProductById(productId);
  }
}
