import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderStatus, OrderStatusSchema } from './schemas/order-status.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderStatus.name, schema: OrderStatusSchema },
    ]),
  ],
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  exports: [MongooseModule],
})
export class OrderStatusModule {}
