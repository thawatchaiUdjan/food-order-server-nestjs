import { Injectable } from '@nestjs/common';
import { CreateDeliveryOptionDto } from './dto/create-delivery-option.dto';
import { UpdateDeliveryOptionDto } from './dto/update-delivery-option.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DeliveryOption } from './schemas/delivery-option.schema';
import { Model } from 'mongoose';

@Injectable()
export class DeliveryOptionService {
  constructor(
    @InjectModel(DeliveryOption.name)
    private deliveryOptionModel: Model<DeliveryOption>,
  ) {}

  create(createDeliveryOptionDto: CreateDeliveryOptionDto) {
    return 'This action adds a new deliveryOption';
  }

  async findAll(): Promise<DeliveryOption[]> {
    return this.deliveryOptionModel.find().sort({ delivery_cost: 1 }).exec();
  }

  findOne(id: string) {
    return `This action returns a #${id} deliveryOption`;
  }

  update(id: string, updateDeliveryOptionDto: UpdateDeliveryOptionDto) {
    return `This action updates a #${id} deliveryOption`;
  }

  remove(id: string) {
    return `This action removes a #${id} deliveryOption`;
  }
}
