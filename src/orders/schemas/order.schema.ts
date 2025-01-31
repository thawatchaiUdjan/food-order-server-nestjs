import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import { OrderStatus } from 'src/order-status/schemas/order-status.schema';
import { DeliveryOption } from 'src/delivery-option/schemas/delivery-option.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
  collection: 'orders',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class Order {
  @Prop({ required: true })
  order_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  subtotal_price: number;

  @Prop({ required: true })
  total_price: number;

  @Prop({ required: true, maxlength: 255 })
  order_address: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: OrderStatus.name,
    required: true,
  })
  order_status: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: DeliveryOption.name,
    required: true,
  })
  order_delivery_option: mongoose.Schema.Types.ObjectId;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
