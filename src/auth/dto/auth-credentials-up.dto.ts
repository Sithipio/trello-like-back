import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsUpDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Matches(
    /^[a-zA-Z]{2,20}$/,
    { message: 'The First Name contains non-Latin letters or symbols or space' },
  )
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Matches(
    /^[a-zA-Z]{2,20}$/,
    { message: 'The Last Name contains non-Latin letters or symbols or space' },
  )
  lastName: string;

}
