import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // Lấy tất cả product
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Lấy product theo ID
  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createCategoryDto: any): Promise<Product> {
    const createdCategory = new this.productModel(createCategoryDto);
    console.log(createdCategory);
    return createdCategory.save();
  }

  async update(id: string, updateProductDto: any): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
  }

  // Xóa product theo ID
  async delete(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return deletedProduct;
  }

  async findProductById(productId: string) {
    // Logic tìm sản phẩm theo productId
    return await this.productModel.findById(productId);
  }

  // async getProductsByCategory(categoryID: string): Promise<Product[]> {
  //   const products = await this.productModel.find({ categoryID }).exec();
  //   if (!products || products.length === 0) {
  //     throw new NotFoundException('No products found for this category');
  //   }
  //   return products;
  // }

  async getProductsByCategory(
    categoryID: string,
    sortOrder: 'asc' | 'desc' = 'asc', // Chỉ sử dụng sortOrder
  ): Promise<Product[]> {
    // Đặt các tùy chọn sắp xếp
    const sortOptions = { price: sortOrder }; // Sắp xếp theo giá

    const products = await this.productModel
      .find({ categoryID })
      .sort(sortOptions)
      .exec();

    if (!products || products.length === 0) {
      throw new NotFoundException('No products found for this category');
    }

    return products;
  }
}
