import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodsModule } from './foods/foods.module';
import { FoodOptionsModule } from './food-options/food-options.module';
import { OptionChoicesModule } from './option-choices/option-choices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FoodCategoriesModule } from './food-categories/food-categories.module';
import { OrdersModule } from './orders/orders.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { DeliveryOptionModule } from './delivery-option/delivery-option.module';
import configuration from './config/configuration';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.host'),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
