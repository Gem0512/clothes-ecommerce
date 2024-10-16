import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({
    type: [
      {
        productId: String,
        quantity: Number,
        size: Object,
        color: Object,
        image: String,
        price: Number,
      },
    ],
  })
  items: {
    productId: string;
    quantity: number;
    size: object;
    color: object;
    image: string;
    price: number;
  }[];

  @Prop()
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
