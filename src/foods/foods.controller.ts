import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FoodsService } from './foods.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { UsersGuard } from 'src/users/users.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { foodStorage } from 'src/config/multer.config';
import { Request } from 'express';

@Controller('foods')
@UseGuards(UsersGuard)
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('food_image_url', { storage: foodStorage }))
  create(
    @Req() req: Request,
    @Body() createFoodDto: CreateFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.foodsService.create(createFoodDto, req, file);
  }

  @Get()
  findAll() {
    return this.foodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodsService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('food_image_url'))
  update(
    @Param('id') id: string,
    @Body() updateFoodDto: UpdateFoodDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.foodsService.update(id, updateFoodDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodsService.remove(id);
  }
}
