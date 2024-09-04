import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  readonly username: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  readonly password?: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  @MaxLength(45)
  readonly role?: string;

  @IsNumber()
  @IsOptional()
  readonly balance?: number;

  @IsOptional()
  readonly location?: {
    readonly address?: string;
    readonly latlng?: {
      readonly lat?: number;
      readonly lng?: number;
    };
  };
}
