import { Module } from '@nestjs/common';
import { DeliveryOptionService } from './delivery-option.service';
import { DeliveryOptionController } from './delivery-option.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DeliveryOption,
  DeliveryOptionSchema,
} from './schemas/delivery-option.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliveryOption.name, schema: DeliveryOptionSchema },
    ]),
  ],
  controllers: [DeliveryOptionController],
  providers: [DeliveryOptionService],
})
export class DeliveryOptionModule {}
