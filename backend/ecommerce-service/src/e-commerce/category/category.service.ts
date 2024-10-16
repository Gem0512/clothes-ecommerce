import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async createCategory(createCategoryDto: any): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    console.log(createdCategory);
    return createdCategory.save();
  }

  async updateCategory(id: string, updateCategoryDto: any): Promise<Category> {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
  }

  async deleteCategory(id: string): Promise<any> {
    return this.categoryModel.findByIdAndDelete(id).exec(); // Sử dụng findByIdAndDelete thay cho findByIdAndRemove
  }

  async findCategoryById(categoryId: string) {
    // Logic tìm sản phẩm theo productId
    return await this.categoryModel.findById(categoryId);
  }
}
