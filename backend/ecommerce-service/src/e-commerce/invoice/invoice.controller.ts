import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../common/roles.guard';
import { Roles } from '../../common/role.decorator';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post('create')
  async createInvoice(@Body() createInvoiceDto: any) {
    return await this.invoiceService.createInvoice(createInvoiceDto);
  }

  @Get()
  async getAllInvoices() {
    return await this.invoiceService.getAllInvoices();
  }

  @Get(':id')
  async getInvoiceById(@Param('id') invoiceId: string) {
    return await this.invoiceService.getInvoiceById(invoiceId);
  }

  @Patch('update/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateInvoice(
    @Param('id') invoiceId: string,
    @Body() updateInvoiceDto: any,
  ) {
    return await this.invoiceService.updateInvoice(invoiceId, updateInvoiceDto);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async deleteInvoice(@Param('id') invoiceId: string) {
    return await this.invoiceService.deleteInvoice(invoiceId);
  }
}
