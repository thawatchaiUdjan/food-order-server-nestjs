import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsOptional()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;

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
