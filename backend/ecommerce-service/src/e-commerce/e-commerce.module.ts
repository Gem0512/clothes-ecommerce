import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { Category, CategorySchema } from './category/category.schema';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { Product, ProductSchema } from './product/product.schema';
import { Cart, CartSchema } from './cart/cart.schema';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { Invoice, InvoiceSchema } from './invoice/invoice.schema';
import { InvoiceController } from './invoice/invoice.controller';
import { InvoiceService } from './invoice/invoice.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Cart.name, schema: CartSchema },
      { name: Invoice.name, schema: InvoiceSchema },
    ]),
  ],
  controllers: [
    CategoryController,
    ProductController,
    CartController,
    InvoiceController,
  ],
  providers: [CategoryService, ProductService, CartService, InvoiceService],
})
export class ECommerceModule {}
