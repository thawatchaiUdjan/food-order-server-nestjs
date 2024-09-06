import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import mongoose, { Model } from 'mongoose';
import { OrderFood } from './schemas/order-food.schema';
import {
  CreateOrderRes,
  FoodOrderRes,
  MessageRes,
  UpdateOrderRes,
} from 'src/types/interfaces';
import { User } from 'src/users/schemas/user.schema';
import { OrderStatus } from 'src/order-status/schemas/order-status.schema';
import { generateUuid } from 'src/common/utils';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(OrderFood.name) private orderFoodModel: Model<OrderFood>,
    @InjectModel(OrderStatus.name) private orderStatusModel: Model<OrderStatus>,
    private readonly userService: UsersService,
  ) {}

  async create(
    user: User,
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderRes> {
    const order = createOrderDto.order;
    const foods = createOrderDto.foods;
    if (user.balance >= order.total_price) {
      order.order_id = generateUuid();
      order.user_id = user.user_id;
      order.order_status = await this.findDefaultOrderStatusId();
      const balance = parseFloat((user.balance - order.total_price).toFixed(2));
      const userData = await this.userService.updateUser(user.user_id, {
        balance: balance,
      });
      const newOrder = new this.orderModel(order);
      await newOrder.save();
      foods.map(async (food) => {
        const orderFood = new this.orderFoodModel({
          order_id: order.order_id,
          food_id: food.food.food_id,
          food_amount: food.amount,
          food_total_price: food.total,
          food_option_string: food.option.option_string,
          food_option_note: food.option.option_note,
        });
        await orderFood.save();
      });
      const foodOrder = await this.findFoodOrderByUserId(order.user_id);
      return {
        message: 'Order item successfully added',
        foodOrder: foodOrder,
        user: userData,
      };
    } else {
      throw new BadRequestException(
        'Unable to create the order. balance is not enough',
      );
    }
  }

  async findOne(userId: string): Promise<FoodOrderRes> {
    return this.findFoodOrderByUserId(userId);
  }

  async update(
    id: string,
    status: mongoose.Schema.Types.ObjectId,
  ): Promise<UpdateOrderRes> {
    const result = await this.orderModel.findOneAndUpdate(
      { order_id: id },
      { order_status: status },
      { new: true },
    );

    if (!result) {
      throw new NotFoundException('Order to update not found');
    }

    return { order: result, message: 'Order status updated successfully' };
  }

  async remove(id: string): Promise<MessageRes> {
    const result = await this.orderModel
      .findOneAndDelete({ order_id: id })
      .exec();
    if (!result) {
      throw new NotFoundException('Order to delete not found');
    }
    return { message: 'Order successfully canceled' };
  }

  async findAll(): Promise<any[]> {
    const result = await this.findOrders();

    for (const order of result) {
      order.foods = await this.findFoodByOrderId(order.order_id);
    }

    return result;
  }

  async findOrders(): Promise<any[]> {
    return this.orderModel
      .aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: 'user_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'order_statuses',
            localField: 'order_status',
            foreignField: '_id',
            as: 'status',
          },
        },
        {
          $lookup: {
            from: 'delivery_options',
            localField: 'order_delivery_option',
            foreignField: '_id',
            as: 'delivery_option',
          },
        },
        { $unwind: '$user' },
        { $unwind: '$status' },
        { $unwind: '$delivery_option' },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [
                '$$ROOT',
                {
                  $mergeObjects: ['$user', '$status'],
                },
              ],
            },
          },
        },
        {
          $project: {
            user: 0,
            status: 0,
          },
        },
      ])
      .exec();
  }

  async findFoodOrderByUserId(userId: string): Promise<FoodOrderRes> {
    const order = await this.findByUserId(userId);
    if (order) {
      const foods = await this.findFoodByOrderId(order.order_id);
      return {
        order: order,
        foods: foods,
      };
    } else {
      return null;
    }
  }

  async findByUserId(userId: string): Promise<Order> {
    return this.orderModel
      .findOne({ user_id: userId })
      .populate('order_status')
      .populate('order_delivery_option')
      .exec();
  }

  async findFoodByOrderId(orderId: string): Promise<OrderFood[]> {
    return this.orderFoodModel.aggregate([
      { $match: { order_id: orderId } },
      {
        $lookup: {
          from: 'foods',
          localField: 'food_id',
          foreignField: 'food_id',
          as: 'food',
        },
      },
      { $unwind: '$food' },
      { $replaceRoot: { newRoot: { $mergeObjects: ['$$ROOT', '$food'] } } },
      { $project: { food: 0, food_options: 0 } },
    ]);
  }

  async findDefaultOrderStatusId(): Promise<mongoose.Schema.Types.ObjectId> {
    const result = await this.orderStatusModel
      .findOne({ status_value: 0 })
      .exec();
    return result._id as unknown as mongoose.Schema.Types.ObjectId;
  }
}
