import { OrderFood } from './schemas/order-food.schema';
import { Model } from 'mongoose';
import { OrderSchema } from './schemas/order.schema';

export function orderSchemaFactory(orderFoodModel: Model<OrderFood>) {
  OrderSchema.pre(
    ['findOneAndDelete', 'deleteMany'],
    handleDelete(orderFoodModel),
  );
  return OrderSchema;
}

function handleDelete(orderFoodModel: Model<OrderFood>) {
  return async function (next: () => void) {
    const orderId = this.getQuery().order_id;
    await orderFoodModel.deleteMany({ order_id: orderId });
    next();
  };
}
