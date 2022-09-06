import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './user.entity';
import { IAuthCredentialsUp } from '../auth/interfaces';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
  }

  async createUser(authCredentialsUp: IAuthCredentialsUp): Promise<void> {
    const user = this.usersRepository.create({
      ...authCredentialsUp,
      password: await this.hashedPassword(authCredentialsUp.password),
    });
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User with that email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

}
