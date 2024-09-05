import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderModelFactory } from './schemas/order.schema';
import { OrderFood, OrderFoodSchema } from './schemas/order-food.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        inject: [OrderModelFactory],
        useFactory: (orderModelFactory: OrderModelFactory) =>
          orderModelFactory.createOrderSchema(),
      },
    ]),
    MongooseModule.forFeature([
      { name: OrderFood.name, schema: OrderFoodSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
