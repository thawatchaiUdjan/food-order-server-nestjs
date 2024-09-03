import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
  IsMongoId,
} from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  readonly food_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  readonly food_name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly food_price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly food_price_discount: number;

  @IsString()
  @IsNotEmpty()
  readonly food_description: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  readonly food_image_url?: string;

  @IsString()
  @IsOptional()
  readonly category_id?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  readonly food_options: string[];
}
