import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsUpDto {
  @IsNotEmpty()
  @IsString()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  userPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Matches(
    /^[a-zA-Z]{2,20}$/,
    { message: 'The First Name contains non-Latin letters or symbols or space' },
  )
  userFirstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Matches(
    /^[a-zA-Z]{2,20}$/,
    { message: 'The Last Name contains non-Latin letters or symbols or space' },
  )
  userLastName: string;

}