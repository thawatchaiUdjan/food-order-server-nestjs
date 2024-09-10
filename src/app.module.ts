import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodsModule } from './foods/foods.module';
import { FoodOptionsModule } from './food-options/food-options.module';
import { OptionChoicesModule } from './option-choices/option-choices.module';
import { UsersModule } from './users/users.module';
import { FoodCategoriesModule } from './food-categories/food-categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { DeliveryOptionModule } from './delivery-option/delivery-option.module';
import { UtilsModule } from './utils/utils.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.database.host,
      }),
    }),
    FoodsModule,
    FoodOptionsModule,
    OptionChoicesModule,
    UsersModule,
    FoodCategoriesModule,
    OrdersModule,
    OrderStatusModule,
    DeliveryOptionModule,
    UtilsModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
