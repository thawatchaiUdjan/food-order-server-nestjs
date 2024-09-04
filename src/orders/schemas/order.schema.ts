import { Injectable } from '@nestjs/common';
import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({
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
    ref: 'order_statuses',
    required: true,
  })
  order_status: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'delivery_options',
    required: true,
  })
  order_delivery_option: mongoose.Schema.Types.ObjectId;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

@Injectable()
export class OrderModelFactory {
  constructor(
    @InjectModel(OrderFood.name)
    private orderFoodModel: Model<OrderFood>,
  ) {}

  public createOrderSchema() {
    OrderSchema.pre(
      'findOneAndDelete',
      async function (next) {
        const orderId = this.getQuery()['order_id'];
        await this.orderFoodModel.deleteMany({ order_id: orderId });
        next();
      }.bind(this),
    );

    return OrderSchema;
  }
}
