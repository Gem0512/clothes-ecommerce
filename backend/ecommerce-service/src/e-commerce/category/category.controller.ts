import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from '..//category/category.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import cloudinary from 'cloudinary.config';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // Đường dẫn lưu trữ tệp
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên tệp
        },
      }),
    }),
  )
  async createCategory(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategoryDto: any,
  ) {
    console.log('File:', file);
    console.log('DTO:', createCategoryDto);
    if (!file) {
      throw new Error('Missing file!');
    }
    // Upload file lên Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path);
    // Lưu URL vào createProductDto
    createCategoryDto.image = uploadResult.secure_url;
    // Chuyển đổi sizes và colors từ chuỗi JSON sang đối tượng
    // Gọi service để lưu vào DB
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: any,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.categoryService.findCategoryById(id);
  }
}
