import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodOptionDto } from './create-food-option.dto';

export class UpdateFoodOptionDto extends PartialType(CreateFoodOptionDto) {}
