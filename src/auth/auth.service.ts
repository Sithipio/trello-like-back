import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsUpDto } from './dto/auth-credentials-up.dto';
import { UsersService } from '../user/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsInDto } from './dto/auth-credentials-in.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async signUp(authCredentialsUpDto: AuthCredentialsUpDto): Promise<void> {
    return this.usersService.createUser(authCredentialsUpDto);
  }

  async signIn(authCredentialsUpDto: AuthCredentialsInDto): Promise<{ accessToken: string }> {
    const { userEmail, userPassword } = authCredentialsUpDto;
    const user = await this.usersRepository.findOneBy({ userEmail: userEmail });
    if (user && (await bcrypt.compare(userPassword, user.userPassword))) {
      const payload: JwtPayload = { userEmail };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
