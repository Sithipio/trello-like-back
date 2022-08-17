import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthCredentialsInDto {
  @IsNotEmpty()
  @IsString()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  userPassword: string;

}