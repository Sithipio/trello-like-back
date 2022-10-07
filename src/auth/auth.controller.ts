import { Body, Controller, Post } from '@nestjs/common';

import { AuthCredentialsUpDto, AuthCredentialsInDto } from './dto';
import { AuthService } from './auth.service';
import { URL_AUTH, URL_SIGN_IN, URL_SIGN_UP } from '../routes.constant';

@Controller(URL_AUTH)
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post(URL_SIGN_UP)
  signUp(@Body() authCredentialsUpDto: AuthCredentialsUpDto): Promise<void> {
    return this.authService.signUp(authCredentialsUpDto);
  }

  @Post(URL_SIGN_IN)
  signIn(@Body() authCredentialsInDto: AuthCredentialsInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsInDto);
  }

}
