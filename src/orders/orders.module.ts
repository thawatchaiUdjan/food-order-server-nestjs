import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderModelFactory } from './schemas/order.schema';

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
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
