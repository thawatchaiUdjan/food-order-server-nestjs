import { Profile } from 'passport-facebook-token';
import { Food } from 'src/foods/schemas/food.schema';
import { OrderFood } from 'src/orders/schemas/order-food.schema';
import { Order } from 'src/orders/schemas/order.schema';
import { User } from 'src/users/schemas/user.schema';

declare module 'express' {
  export interface Request {
    user?: User | Profile;
    token?: string;
  }
}

export interface MessageRes {
  message: string;
}

export interface UserData {
  user: User;
  token: string;
}

export interface UpdateUserRes {
  user: UserData;
  message: string;
}

export interface FoodOrderRes {
  order: Order;
  foods: OrderFood[];
}

export interface UpdateOrderRes {
  order: Order;
  message: string;
}

export interface CreateOrderRes {
  foodOrder: FoodOrderRes;
  user: UserData;
  message: string;
}

export interface CreateFoodRes {
  food: Food;
  message: string;
}
