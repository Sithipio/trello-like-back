import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../user/user.entity';
import { UsersService } from '../user/users.service';
import { IAuthCredentialsIn, IAuthCredentialsUp, JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async signUp(authCredentialsUp: IAuthCredentialsUp): Promise<void> {
    return this.usersService.createUser(authCredentialsUp);
  }

  async signIn(authCredentialsIn: IAuthCredentialsIn): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsIn;
    const user = await this.usersRepository.findOneBy({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email: email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
