import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderStatusDocument = HydratedDocument<OrderStatus>;

@Schema({
  collection: 'order_statuses',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class OrderStatus {
  @Prop({ required: true, maxlength: 45 })
  status_name: string;

  @Prop({ required: true })
  status_value: number;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const OrderStatusSchema = SchemaFactory.createForClass(OrderStatus);
