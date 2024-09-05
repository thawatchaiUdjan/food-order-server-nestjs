import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UsersGuard } from 'src/users/users.guard';
import { Request } from 'express';
import mongoose from 'mongoose';

@Controller('orders')
@UseGuards(UsersGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user, createOrderDto);
  }

  @Get('all-order')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get()
  findOne(@Req() req: Request) {
    return this.ordersService.findOne(req.user.user_id);
  }

  @Put(':id/:status')
  update(@Param('id') id: string, @Param('status') status: string) {
    const statusId = new mongoose.Schema.Types.ObjectId(status);
    return this.ordersService.update(id, statusId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
