import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(45)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}
