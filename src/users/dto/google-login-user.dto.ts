import { IsString, IsNotEmpty } from 'class-validator';

export class GoogleLoginUserDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
