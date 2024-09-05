import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliveryOptionService } from './delivery-option.service';
import { CreateDeliveryOptionDto } from './dto/create-delivery-option.dto';
import { UpdateDeliveryOptionDto } from './dto/update-delivery-option.dto';

@Controller('delivery')
export class DeliveryOptionController {
  constructor(private readonly deliveryOptionService: DeliveryOptionService) {}

  @Post()
  create(@Body() createDeliveryOptionDto: CreateDeliveryOptionDto) {
    return this.deliveryOptionService.create(createDeliveryOptionDto);
  }

  @Get()
  findAll() {
    return this.deliveryOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryOptionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryOptionDto: UpdateDeliveryOptionDto,
  ) {
    return this.deliveryOptionService.update(id, updateDeliveryOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryOptionService.remove(id);
  }
}
