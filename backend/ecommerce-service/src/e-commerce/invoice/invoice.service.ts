import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice } from './invoice.schema';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
  ) {}

  async createInvoice(createInvoiceDto: any): Promise<Invoice> {
    const newInvoice = new this.invoiceModel(createInvoiceDto);
    return await newInvoice.save();
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return await this.invoiceModel.find().exec();
  }

  async getInvoiceById(invoiceId: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findById(invoiceId).exec();
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  async updateInvoice(
    invoiceId: string,
    updateInvoiceDto: any,
  ): Promise<Invoice> {
    const updatedInvoice = await this.invoiceModel
      .findByIdAndUpdate(invoiceId, updateInvoiceDto, { new: true })
      .exec();
    if (!updatedInvoice) {
      throw new NotFoundException('Invoice not found');
    }
    return updatedInvoice;
  }

  async deleteInvoice(invoiceId: string): Promise<Invoice> {
    const deletedInvoice = await this.invoiceModel
      .findByIdAndDelete(invoiceId)
      .exec();
    if (!deletedInvoice) {
      throw new NotFoundException('Invoice not found');
    }
    return deletedInvoice;
  }
}
