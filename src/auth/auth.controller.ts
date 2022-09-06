import { Body, Controller, Post } from '@nestjs/common';

import { AuthCredentialsUpDto, AuthCredentialsInDto } from './dto';
import { AuthService } from './auth.service';
import { AppRoutes } from '../app-routes';

@Controller(AppRoutes.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post(AppRoutes.SIGN_UP)
  signUp(@Body() authCredentialsUpDto: AuthCredentialsUpDto): Promise<void> {
    return this.authService.signUp(authCredentialsUpDto);
  }

  @Post(AppRoutes.SIGN_IN)
  signIn(@Body() authCredentialsInDto: AuthCredentialsInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsInDto);
  }

}
