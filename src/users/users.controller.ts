import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersGuard } from './users.guard';
import { Request } from 'express';
import { User } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('verify-token')
  @UseGuards(UsersGuard)
  verifyToken() {
    return 'verify complete';
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(
      loginUserDto.username,
      loginUserDto.password,
    );
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.usersService.register(registerUserDto);
  }

  @Get()
  @UseGuards(UsersGuard)
  findOne(@Req() req: Request) {
    return this.usersService.findOne(req.user.user_id);
  }

  @Put()
  @UseGuards(UsersGuard)
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user, updateUserDto);
  }

  @Delete()
  remove() {
    return this.usersService.remove();
  }
}
