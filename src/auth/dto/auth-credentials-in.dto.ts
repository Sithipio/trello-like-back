import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsInDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

}
