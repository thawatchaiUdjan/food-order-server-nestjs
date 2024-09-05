import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderFoodDocument = HydratedDocument<OrderFood>;

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class OrderFood {
  @Prop({ required: true })
  order_id: string;

  @Prop({ required: true })
  food_id: string;

  @Prop({ required: true })
  food_amount: number;

  @Prop({ required: true })
  food_total_price: number;

  @Prop([{ type: String, maxlength: 48 }])
  food_option_string: string[];

  @Prop()
  food_option_note?: string;
}

export const OrderFoodSchema = SchemaFactory.createForClass(OrderFood);
