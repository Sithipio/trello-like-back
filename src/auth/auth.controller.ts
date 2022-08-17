import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsUpDto } from './dto/auth-credentials-up.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsInDto } from './dto/auth-credentials-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/sign-up')
  signUp(@Body() authCredentialsUpDto: AuthCredentialsUpDto): Promise<void> {
    return this.authService.signUp(authCredentialsUpDto);
  }

  @Post('/sign-in')
  signIn(@Body() authCredentialsInDto: AuthCredentialsInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsInDto);
  }

}
