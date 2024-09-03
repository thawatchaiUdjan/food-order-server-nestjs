import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodsModule } from './foods/foods.module';
import { FoodOptionsModule } from './food-options/food-options.module';
import { OptionChoicesModule } from './option-choices/option-choices.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
