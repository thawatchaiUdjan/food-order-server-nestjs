import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { generateUuid, hashPassword, verifyPassword } from 'src/common/utils';
import { JwtService } from '@nestjs/jwt';
import { MessageRes, UpdateUserRes, UserData } from 'src/types/interfaces';
import { Order } from 'src/orders/schemas/order.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<UserData> {
    const user = await this.findUser(username);
    if (user) {
      const isMatch = await verifyPassword(password, user.password);
      if (isMatch) {
        const token = await this.jwtService.signAsync({ user: user });
        return {
          user: user,
          token: token,
        };
      } else {
        throw new NotFoundException('Username or password invalid');
      }
    } else {
      throw new NotFoundException('Username or password invalid');
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserData> {
    const user = await this.findUser(registerUserDto.username);
    if (!user) {
      const userId = generateUuid();
      const hashedPassword = await hashPassword(
        registerUserDto.password,
        this.configService.get<number>('encryptSaltRounds'),
      );
      registerUserDto.user_id = userId;
      registerUserDto.password = hashedPassword;
      const result = await new this.userModel(registerUserDto).save();
      const token = await this.jwtService.signAsync({ user: result });
      return { user: result, token: token };
    } else {
      throw new ConflictException('Username is already in use');
    }
  }

  async update(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserRes> {
    const result = await this.updateUser(user.user_id, updateUserDto);
    return { user: result, message: 'User data successfully updated' };
  }

  async remove(userId: string): Promise<MessageRes> {
    const order = this.orderModel.findOne({ user_id: userId });
    if (order) {
      throw new BadRequestException('account have an order, cant be delete');
    }
    await this.userModel.deleteOne({ user_id: userId });
    return { message: 'Delete account successfully' };
  }

  async findUser(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async updateUser(userId: string, user: UpdateUserDto): Promise<UserData> {
    {
      const result = await this.userModel.findOneAndUpdate(
        { user_id: userId },
        user,
        { new: true },
      );
      const token = await this.jwtService.signAsync({ user: result });
      return { user: result, token: token };
    }
  }

  async findOne(userId: string, token: string): Promise<UserData> {
    const result = await this.userModel.findOne({ user_id: userId });
    return { user: result, token: token };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
