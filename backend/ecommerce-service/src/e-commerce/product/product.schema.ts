import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  rating: string;

  @Prop([
    {
      name: { type: String, required: true },
      inStock: { type: Boolean, required: true },
    },
  ])
  sizes: { name: string; inStock: boolean }[];

  @Prop([
    {
      name: { type: String, required: true },
      class: { type: String, required: true },
      selectedClass: { type: String, required: true },
    },
  ])
  colors: { name: string; class: string; selectedClass: string }[];

  @Prop({ type: Number, required: true })
  price: number;

  @Prop()
  categoryID: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
