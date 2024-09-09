import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersGuard } from './guards/users.guard';
import { Request } from 'express';
import { GoogleLoginUserDto } from './dto/google-login-user.dto';
import { FacebookGuard } from './guards/facebook.guard';
import { Profile } from 'passport-facebook-token';
import { User } from './schemas/user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { profileStorage } from 'src/config/multer.config';

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

  @Post('google-login')
  googleLogin(@Body() loginUserDto: GoogleLoginUserDto) {
    return this.usersService.googleLogin(loginUserDto.code);
  }

  @Post('facebook-login')
  @UseGuards(FacebookGuard)
  facebookLogin(@Req() req: Request) {
    return this.usersService.facebookLogin(req.user as Profile);
  }

  @Get()
  @UseGuards(UsersGuard)
  findOne(@Req() req: Request) {
    return this.usersService.findOne((req.user as User).user_id, req.token);
  }

  @Put()
  @UseGuards(UsersGuard)
  @UseInterceptors(
    FileInterceptor('profile_image_url', {
      storage: profileStorage,
    }),
  )
  update(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.update(req.user as User, updateUserDto, file);
  }

  @Delete()
  @UseGuards(UsersGuard)
  remove(@Req() req: Request) {
    return this.usersService.remove((req.user as User).user_id);
  }
}
