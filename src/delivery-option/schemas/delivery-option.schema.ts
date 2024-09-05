import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeliveryOptionDocument = HydratedDocument<DeliveryOption>;

@Schema({
  collection: 'delivery_options',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
})
export class DeliveryOption {
  @Prop({ required: true, maxlength: 48 })
  delivery_name: string;

  @Prop({ required: true, maxlength: 100 })
  delivery_description: string;

  @Prop({ required: true })
  delivery_cost: number;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const DeliveryOptionSchema =
  SchemaFactory.createForClass(DeliveryOption);
