import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from 'src/orders/orders.module';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
  imports: [
    forwardRef(() => OrdersModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwtSecret'),
        signOptions: {
          expiresIn: configService.get<string>('token.tokenExpiredTime'),
        },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, FacebookStrategy],
  exports: [UsersService],
})
export class UsersModule {}
