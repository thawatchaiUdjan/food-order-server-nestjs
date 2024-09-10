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
import { UsersGuard } from 'src/users/guards/users.guard';
import { Request } from 'express';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Controller('orders')
@UseGuards(UsersGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user as User, createOrderDto);
  }

  @Get('all-order')
  findAll() {
    return this.ordersService.findAll();
  }

  @Get()
  findOne(@Req() req: Request) {
    return this.ordersService.findOne((req.user as User).user_id);
  }

  @Put(':id/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
