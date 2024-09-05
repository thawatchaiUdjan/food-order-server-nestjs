import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { OrderStatus } from './schemas/order-status.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderStatusService {
  constructor(
    @InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatus>,
  ) {}

  create(createOrderStatusDto: CreateOrderStatusDto) {
    return 'This action adds a new orderStatus';
  }

  async findAll(): Promise<OrderStatus[]> {
    return this.orderStatusModel.find().exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} orderStatus`;
  }

  update(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    return `This action updates a #${id} orderStatus`;
  }

  remove(id: string) {
    return `This action removes a #${id} orderStatus`;
  }
}
