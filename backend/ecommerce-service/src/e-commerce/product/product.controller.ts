import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/common/role.decorator';
import { Product } from './product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import cloudinary from 'cloudinary.config';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // API lấy tất cả products
  @Get()
  async getAllProducts() {
    return this.productService.findAll();
  }

  // API lấy product theo ID
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Post()
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
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: any,
  ) {
    console.log('File:', file);
    console.log('DTO:', createProductDto);
    if (!file) {
      throw new Error('Missing file!');
    }
    // Upload file lên Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path);
    // Lưu URL vào createProductDto
    createProductDto.image = uploadResult.secure_url;
    // Chuyển đổi sizes và colors từ chuỗi JSON sang đối tượng
    createProductDto.sizes = JSON.parse(createProductDto.sizes);
    createProductDto.colors = JSON.parse(createProductDto.colors);
    // Gọi service để lưu vào DB
    return this.productService.create(createProductDto);
  }
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // async createProduct(@Body() createProductDto: any) {
  //   return this.productService.create(createProductDto);
  // }

  @Put(':id')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin') // Chỉ admin mới có quyền sửa
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productService.update(id, updateProductDto);
  }

  // API xóa product
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }

  @Get('category/:categoryID')
  async getProductsByCategory(
    @Param('categoryID') categoryID: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc', // Không định nghĩa mặc định ở đây
  ): Promise<Product[]> {
    // Nếu sortOrder không có, gán mặc định là 'asc'
    const order = sortOrder || 'asc';
    return this.productService.getProductsByCategory(categoryID, order);
  }

  // async getProductsByCategory(@Param('categoryID') categoryID: string) {
  //   return await this.productService.getProductsByCategory(categoryID);
  // }
}
