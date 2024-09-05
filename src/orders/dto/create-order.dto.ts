import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { Food } from 'src/foods/schemas/food.schema';
import { Order } from '../schemas/order.schema';

export class FoodCartOption {
  @IsString()
  readonly option_string: string;

  @IsString()
  readonly option_note: string;
}

export class FoodCart {
  @IsNotEmpty()
  readonly food: Food;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsNumber()
  readonly total: number;

  @IsNotEmpty()
  @IsObject()
  readonly option: FoodCartOption;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  readonly foods: FoodCart[];

  @IsNotEmpty()
  order: Order;
}
