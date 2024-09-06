import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { OrderFood, OrderFoodSchema } from './schemas/order-food.schema';
import { orderSchemaFactory } from './order-model.factory';
import { Model } from 'mongoose';
import { OrderStatusModule } from 'src/order-status/order-status.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    OrderStatusModule,
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        inject: [getModelToken(OrderFood.name)],
        imports: [
          MongooseModule.forFeature([
            { name: OrderFood.name, schema: OrderFoodSchema },
          ]),
        ],
        useFactory: (orderFoodModel: Model<OrderFood>) =>
          orderSchemaFactory(orderFoodModel),
      },
    ]),
    MongooseModule.forFeature([
      { name: OrderFood.name, schema: OrderFoodSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [MongooseModule],
})
export class OrdersModule {}
